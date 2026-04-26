import CrudModulePage from '../components/CrudModulePage'
import { salesData } from '../data/erpData'

const SalesPage = () => {
  return (
    <CrudModulePage
      title="Sales Order Tracker"
      subtitle="Manage orders, delivery commitments, and stages."
      initialRows={salesData}
      columns={[
        { key: 'so', label: 'SO Number' },
        { key: 'customer', label: 'Customer' },
        { key: 'value', label: 'Order Value' },
        { key: 'due', label: 'Due Date' },
        { key: 'stage', label: 'Stage' },
      ]}
      actionLabel="Add Sales Order"
      addSuccess="Sales order created."
      editSuccess="Sales order updated."
      deleteSuccess="Sales order deleted."
    />
  )
}

export default SalesPage
