import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import EntityCrudTable from '../components/EntityCrudTable'
import { useErp } from '../context/ErpContext'

const ProductionPage = () => {
  const { notify } = useOutletContext()
  const { production, shifts, machines, products, users, lookup, productionCrud, generateBatchesForShift } =
    useErp()

  const shiftOptions = useMemo(
    () => shifts.map((s) => ({ value: s.id, label: `${s.shift_name} (${s.start_time}-${s.end_time})` })),
    [shifts],
  )

  return (
    <div className="dashboard">
      <EntityCrudTable
        title="Production Tracking"
        subtitle="Record per-shift per-machine output and manager accountability."
        rows={production}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'date', label: 'Date' },
          { key: 'shift_id', label: 'Shift', render: (row) => lookup.shiftName[row.shift_id] ?? row.shift_id },
          { key: 'machine_id', label: 'Machine', render: (row) => lookup.machineName[row.machine_id] ?? row.machine_id },
          { key: 'product_id', label: 'Product', render: (row) => lookup.productName[row.product_id] ?? row.product_id },
          { key: 'quantity', label: 'Qty' },
          { key: 'manager_id', label: 'Manager', render: (row) => lookup.userName[row.manager_id] ?? row.manager_id },
          { key: 'status', label: 'Status' },
        ]}
        fields={[
          { key: 'date', label: 'Date', type: 'date' },
          { key: 'shift_id', label: 'Shift', type: 'select', options: shiftOptions },
          {
            key: 'machine_id',
            label: 'Machine',
            type: 'select',
            options: machines.map((m) => ({ value: m.id, label: m.machine_name })),
          },
          {
            key: 'product_id',
            label: 'Product',
            type: 'select',
            options: products.map((p) => ({ value: p.id, label: p.product_name })),
          },
          { key: 'quantity', label: 'Quantity', type: 'number' },
          {
            key: 'manager_id',
            label: 'Manager',
            type: 'select',
            options: users
              .filter((u) => u.role === 'Admin' || u.role === 'Shift Manager')
              .map((u) => ({ value: u.id, label: u.name })),
          },
          {
            key: 'status',
            label: 'Status',
            type: 'select',
            options: [
              { value: 'open', label: 'Open' },
              { value: 'closed', label: 'Closed' },
            ],
          },
        ]}
        addLabel="Start Shift Entry"
        onAdd={(data) => {
          productionCrud.add({ ...data, quantity: Number(data.quantity) }, 'PR')
          notify('Production entry added.')
        }}
        onUpdate={(id, data) => {
          productionCrud.update(id, { ...data, quantity: Number(data.quantity) })
          notify('Production entry updated.')
        }}
        onDelete={(id) => {
          productionCrud.remove(id)
          notify('Production entry deleted.')
        }}
      />

      <section className="module-section">
        <div className="section-head">
          <div>
            <h3>Batch Generation (Core Logic)</h3>
            <p>Close shift and auto-generate batch codes from open production entries.</p>
          </div>
        </div>
        <div className="d-flex flex-wrap gap-2">
          {shifts.map((shift) => (
            <button
              className="btn btn-primary btn-sm"
              key={shift.id}
              type="button"
              onClick={() => {
                const result = generateBatchesForShift(shift.id, new Date().toISOString().slice(0, 10))
                notify(result.message, result.ok ? 'success' : 'error')
              }}
            >
              Close {shift.shift_name} Shift & Generate Batches
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductionPage
