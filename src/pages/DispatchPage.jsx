import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useErp } from '../context/ErpContext'

const DispatchPage = () => {
  const { notify } = useOutletContext()
  const { products, dispatch, batches, lookup, users, createDispatchFIFO } = useErp()
  const [formData, setFormData] = useState({
    product_id: products[0]?.id ?? '',
    quantity: '',
    customer: '',
    dispatched_by: users.find((u) => u.role === 'Warehouse Staff')?.id ?? users[0]?.id ?? '',
    date: new Date().toISOString().slice(0, 10),
  })

  return (
    <section className="module-section">
      <div className="section-head">
        <div>
          <h3>Dispatch with FIFO</h3>
          <p>Create outward entries. System picks oldest stock batches first.</p>
        </div>
      </div>

      <form
        className="row g-2 mb-3"
        onSubmit={(e) => {
          e.preventDefault()
          const result = createDispatchFIFO(formData)
          notify(result.message, result.ok ? 'success' : 'error')
        }}
      >
        <div className="col-12 col-md-3">
          <select
            className="form-select"
            value={formData.product_id}
            onChange={(e) => setFormData((p) => ({ ...p, product_id: e.target.value }))}
            required
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.product_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-2">
          <input
            className="form-control"
            placeholder="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData((p) => ({ ...p, quantity: e.target.value }))}
            required
          />
        </div>
        <div className="col-12 col-md-3">
          <input
            className="form-control"
            placeholder="Customer"
            value={formData.customer}
            onChange={(e) => setFormData((p) => ({ ...p, customer: e.target.value }))}
            required
          />
        </div>
        <div className="col-12 col-md-2">
          <input
            className="form-control"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
            required
          />
        </div>
        <div className="col-12 col-md-2">
          <button className="btn btn-dark w-100" type="submit">
            Dispatch
          </button>
        </div>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Batch</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Customer</th>
              <th>Dispatched By</th>
            </tr>
          </thead>
          <tbody>
            {dispatch.map((row) => {
              const batch = batches.find((b) => b.id === row.batch_id)
              return (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{batch?.batch_code ?? row.batch_id}</td>
                  <td>{batch ? lookup.productName[batch.product_id] : '-'}</td>
                  <td>{row.quantity}</td>
                  <td>{row.customer}</td>
                  <td>{lookup.userName[row.dispatched_by] ?? row.dispatched_by}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DispatchPage
