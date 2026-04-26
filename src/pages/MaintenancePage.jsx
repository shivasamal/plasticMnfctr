import CrudModulePage from '../components/CrudModulePage'
import { maintenanceData } from '../data/erpData'

const MaintenancePage = () => {
  return (
    <CrudModulePage
      title="Maintenance Work Orders"
      subtitle="Track preventive and breakdown work orders."
      initialRows={maintenanceData}
      columns={[
        { key: 'ticket', label: 'Ticket' },
        { key: 'equipment', label: 'Equipment' },
        { key: 'type', label: 'Type' },
        { key: 'due', label: 'Due' },
        { key: 'status', label: 'Status' },
      ]}
      actionLabel="Add Work Order"
      addSuccess="Work order created."
      editSuccess="Work order updated."
      deleteSuccess="Work order deleted."
    />
  )
}

export default MaintenancePage
