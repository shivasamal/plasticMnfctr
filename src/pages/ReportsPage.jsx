import CrudModulePage from '../components/CrudModulePage'
import { reportData } from '../data/erpData'

const ReportsPage = () => {
  return (
    <CrudModulePage
      title="Scheduled Reports"
      subtitle="Maintain report jobs and reporting cadence."
      initialRows={reportData}
      columns={[
        { key: 'report', label: 'Report Name' },
        { key: 'owner', label: 'Owner' },
        { key: 'frequency', label: 'Frequency' },
        { key: 'lastRun', label: 'Last Run' },
      ]}
      actionLabel="Add Report Job"
      addSuccess="Report job added."
      editSuccess="Report job updated."
      deleteSuccess="Report job deleted."
    />
  )
}

export default ReportsPage
