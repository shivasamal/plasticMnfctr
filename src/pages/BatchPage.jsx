import { useErp } from '../context/ErpContext'

const BatchPage = () => {
  const { batches, lookup } = useErp()

  return (
    <section className="module-section">
      <div className="section-head">
        <div>
          <h3>Batch Register</h3>
          <p>Auto-generated batch codes linked to production and inventory.</p>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Batch Code</th>
              <th>Date</th>
              <th>Shift</th>
              <th>Machine</th>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id}>
                <td>{batch.batch_code}</td>
                <td>{batch.date}</td>
                <td>{lookup.shiftName[batch.shift_id] ?? batch.shift_id}</td>
                <td>{lookup.machineName[batch.machine_id] ?? batch.machine_id}</td>
                <td>{lookup.productName[batch.product_id] ?? batch.product_id}</td>
                <td>{batch.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default BatchPage
