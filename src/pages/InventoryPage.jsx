import { useErp } from '../context/ErpContext'

const InventoryPage = () => {
  const { inventory, batches, lookup } = useErp()

  const rows = inventory.map((inv) => {
    const batch = batches.find((b) => b.id === inv.batch_id)
    return {
      ...inv,
      batch_code: batch?.batch_code ?? inv.batch_id,
      product: batch ? lookup.productName[batch.product_id] : 'Unknown',
      batch_date: batch?.date ?? '-',
    }
  })

  return (
    <section className="module-section">
      <div className="section-head">
        <div>
          <h3>Inventory (Batch FIFO View)</h3>
          <p>Stock ledger with batch-age visibility for FIFO dispatch decisions.</p>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Batch Code</th>
              <th>Product</th>
              <th>Batch Date</th>
              <th>Quantity</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.batch_code}</td>
                <td>{row.product}</td>
                <td>{row.batch_date}</td>
                <td>{row.quantity}</td>
                <td>{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default InventoryPage
