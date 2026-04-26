import CrudModulePage from '../components/CrudModulePage'
import { planningData } from '../data/erpData'

const PlanningPage = () => {
  return (
    <CrudModulePage
      title="Batch Plan Board"
      subtitle="Plan, modify, and track batch schedules."
      initialRows={planningData}
      columns={[
        { key: 'batch', label: 'Batch ID' },
        { key: 'machine', label: 'Machine' },
        { key: 'product', label: 'Product' },
        { key: 'qty', label: 'Target Qty' },
        { key: 'start', label: 'Start Time' },
        { key: 'status', label: 'Status' },
      ]}
      actionLabel="Add Batch"
      addSuccess="Batch schedule created."
      editSuccess="Batch schedule updated."
      deleteSuccess="Batch schedule deleted."
    />
  )
}

export default PlanningPage
