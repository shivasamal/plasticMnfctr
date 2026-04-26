import CrudModulePage from '../components/CrudModulePage'
import { financeData } from '../data/erpData'

const FinancePage = () => {
  return (
    <CrudModulePage
      title="Finance Control Desk"
      subtitle="Track payable and receivable records in one place."
      initialRows={financeData}
      columns={[
        { key: 'doc', label: 'Document' },
        { key: 'party', label: 'Party' },
        { key: 'type', label: 'Type' },
        { key: 'amount', label: 'Amount' },
        { key: 'status', label: 'Status' },
      ]}
      actionLabel="Add Finance Record"
      addSuccess="Finance record created."
      editSuccess="Finance record updated."
      deleteSuccess="Finance record deleted."
    />
  )
}

export default FinancePage
