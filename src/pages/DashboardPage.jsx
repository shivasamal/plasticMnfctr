import { useOutletContext } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { useErp } from '../context/ErpContext'

const DashboardPage = () => {
  const { notify } = useOutletContext()
  const { production, inventory, batches, lookup, dispatch } = useErp()

  const shiftTotals = production.reduce((acc, p) => {
    const key = lookup.shiftName[p.shift_id] ?? p.shift_id
    acc[key] = (acc[key] ?? 0) + Number(p.quantity)
    return acc
  }, {})
  const shiftChart = Object.entries(shiftTotals).map(([name, value]) => ({ name, value }))
  const maxShift = Math.max(...shiftChart.map((r) => r.value), 1)

  const machineTotals = production.reduce((acc, p) => {
    const key = lookup.machineName[p.machine_id] ?? p.machine_id
    acc[key] = (acc[key] ?? 0) + Number(p.quantity)
    return acc
  }, {})
  const machineTotal = Object.values(machineTotals).reduce((a, b) => a + b, 0) || 1
  const machinePie = Object.entries(machineTotals).map(([name, value], idx) => ({
    name,
    value,
    percent: Math.round((value / machineTotal) * 100),
    color: ['#2563eb', '#06b6d4', '#14b8a6', '#8b5cf6'][idx % 4],
  }))

  const productNode = batches.reduce((acc, b) => {
    const product = lookup.productName[b.product_id] ?? b.product_id
    if (!acc[product]) acc[product] = []
    acc[product].push(b.batch_code)
    return acc
  }, {})

  const totalStock = inventory.reduce((sum, row) => sum + Number(row.quantity), 0)
  const totalDispatch = dispatch.reduce((sum, row) => sum + Number(row.quantity), 0)
  const openProduction = production.filter((row) => row.status === 'open').length

  const kpis = [
    { label: 'Total Production Qty', value: production.reduce((s, p) => s + Number(p.quantity), 0), trend: 'Across all shifts' },
    { label: 'Current Stock', value: totalStock, trend: 'Batch-wise FIFO stock' },
    { label: 'Total Dispatch Qty', value: totalDispatch, trend: 'Outward completed' },
    { label: 'Open Shift Entries', value: openProduction, trend: 'Pending close' },
  ]

  const exportCsv = () => {
    const lines = ['Metric,Value']
    kpis.forEach((k) => lines.push(`${k.label},${k.value}`))
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `erp-dashboard-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    notify('Dashboard CSV exported.')
  }

  const exportPdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Plastic ERP Dashboard Summary', 14, 18)
    doc.setFontSize(11)
    let y = 30
    kpis.forEach((k) => {
      doc.text(`${k.label}: ${k.value}`, 14, y)
      y += 8
    })
    y += 4
    doc.text('Shift Production', 14, y)
    y += 8
    shiftChart.forEach((r) => {
      doc.text(`${r.name}: ${r.value}`, 20, y)
      y += 7
    })
    doc.save(`erp-dashboard-${new Date().toISOString().slice(0, 10)}.pdf`)
    notify('Dashboard PDF exported.')
  }

  return (
    <div className="dashboard">
      <div className="kpi-grid">
        {kpis.map((card) => (
          <article className="kpi-card" key={card.label}>
            <p>{card.label}</p>
            <h3>{card.value}</h3>
            <span className="trend">{card.trend}</span>
          </article>
        ))}
      </div>
      <section className="module-section">
        <div className="d-flex gap-2 justify-content-end">
          <button className="btn btn-outline-primary btn-sm" type="button" onClick={exportCsv}>
            Download Stats CSV
          </button>
          <button className="btn btn-dark btn-sm" type="button" onClick={exportPdf}>
            Download PDF
          </button>
        </div>
      </section>
      <div className="charts-grid">
        <article className="panel-card chart-card">
          <h3>Production per Shift (Bar)</h3>
          <p>Real-time output split across shift operations.</p>
          <div className="trend-chart">
            {shiftChart.map((point) => (
              <div className="trend-point" key={point.name}>
                <div
                  className="trend-bar"
                  style={{ height: `${Math.round((point.value / maxShift) * 100)}%` }}
                ></div>
                <span>{point.name}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card chart-card">
          <h3>Machine Performance (Pie)</h3>
          <p>Contribution share by machine from production volume.</p>
          <div className="donut-track">
            {machinePie.map((item) => (
              <div className="mix-row" key={item.name}>
                <div className="mix-label">
                  <span className="mix-dot" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </div>
                <div className="mix-bar-shell">
                  <div
                    className="mix-bar-fill"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <strong>{item.percent}%</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card chart-card">
          <h3>Product to Batch Tree</h3>
          <p>Hierarchy view from product to generated batches.</p>
          <div className="tree-chart">
            {Object.entries(productNode).map(([product, batchCodes]) => (
              <div key={product} className="tree-node">
                <h4>{product}</h4>
                <ul>
                  {batchCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      </div>
      <div className="data-grid">
        <section className="module-section">
          <div className="section-head">
            <div>
              <h3>Operational Snapshot</h3>
              <p>Quick status summary aligned to goals and accountability.</p>
            </div>
            <button className="ghost-btn" type="button" onClick={() => notify('Dashboard refreshed.')}>
              Refresh
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Production Entries</td>
                  <td>{production.length}</td>
                </tr>
                <tr>
                  <td>Generated Batches</td>
                  <td>{batches.length}</td>
                </tr>
                <tr>
                  <td>Inventory Rows</td>
                  <td>{inventory.length}</td>
                </tr>
                <tr>
                  <td>Dispatch Transactions</td>
                  <td>{dispatch.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
