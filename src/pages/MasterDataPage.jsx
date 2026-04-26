import { useOutletContext } from 'react-router-dom'
import EntityCrudTable from '../components/EntityCrudTable'
import { useErp } from '../context/ErpContext'

const MasterDataPage = () => {
  const { notify } = useOutletContext()
  const { products, machines, shifts, production, batches, productCrud, machineCrud, shiftCrud } = useErp()

  return (
    <div className="dashboard">
      <EntityCrudTable
        title="Products Master"
        subtitle="Maintain product catalog used in production and dispatch."
        rows={products}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'product_name', label: 'Product Name' },
          { key: 'type', label: 'Type' },
        ]}
        fields={[
          { key: 'product_name', label: 'Product Name' },
          { key: 'type', label: 'Type' },
        ]}
        addLabel="Add Product"
        onAdd={(data) => {
          productCrud.add(data, 'P')
          notify('Product added.')
        }}
        onUpdate={(id, data) => {
          productCrud.update(id, data)
          notify('Product updated.')
        }}
        onDelete={(id) => {
          const inUse = production.some((p) => p.product_id === id) || batches.some((b) => b.product_id === id)
          if (inUse) {
            notify('Product is linked to production/batches. Delete blocked.', 'error')
            return
          }
          productCrud.remove(id)
          notify('Product deleted.')
        }}
      />

      <EntityCrudTable
        title="Machines Master"
        subtitle="Manage machine list for shift assignments and batch coding."
        rows={machines}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'machine_name', label: 'Machine Name' },
        ]}
        fields={[{ key: 'machine_name', label: 'Machine Name' }]}
        addLabel="Add Machine"
        onAdd={(data) => {
          machineCrud.add(data, 'M')
          notify('Machine added.')
        }}
        onUpdate={(id, data) => {
          machineCrud.update(id, data)
          notify('Machine updated.')
        }}
        onDelete={(id) => {
          const inUse = production.some((p) => p.machine_id === id) || batches.some((b) => b.machine_id === id)
          if (inUse) {
            notify('Machine is linked to production/batches. Delete blocked.', 'error')
            return
          }
          machineCrud.remove(id)
          notify('Machine deleted.')
        }}
      />

      <EntityCrudTable
        title="Shifts Master"
        subtitle="Define shift windows used in production tracking."
        rows={shifts}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'shift_name', label: 'Shift' },
          { key: 'start_time', label: 'Start' },
          { key: 'end_time', label: 'End' },
        ]}
        fields={[
          { key: 'shift_name', label: 'Shift Name' },
          { key: 'start_time', label: 'Start Time', type: 'time' },
          { key: 'end_time', label: 'End Time', type: 'time' },
        ]}
        addLabel="Add Shift"
        onAdd={(data) => {
          shiftCrud.add(data, 'S')
          notify('Shift added.')
        }}
        onUpdate={(id, data) => {
          shiftCrud.update(id, data)
          notify('Shift updated.')
        }}
        onDelete={(id) => {
          const inUse = production.some((p) => p.shift_id === id) || batches.some((b) => b.shift_id === id)
          if (inUse) {
            notify('Shift is linked to production/batches. Delete blocked.', 'error')
            return
          }
          shiftCrud.remove(id)
          notify('Shift deleted.')
        }}
      />
    </div>
  )
}

export default MasterDataPage
