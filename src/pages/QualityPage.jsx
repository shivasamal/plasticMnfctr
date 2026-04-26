import CrudModulePage from '../components/CrudModulePage'
import { qualityData } from '../data/erpData'

const QualityPage = () => {
  return (
    <CrudModulePage
      title="Lot Quality Register"
      subtitle="Capture inspections and maintain quality actions."
      initialRows={qualityData}
      columns={[
        { key: 'lot', label: 'Lot' },
        { key: 'test', label: 'Test' },
        { key: 'result', label: 'Result' },
        { key: 'inspector', label: 'Inspector' },
        { key: 'action', label: 'Action' },
      ]}
      actionLabel="Add Inspection"
      addSuccess="Inspection record added."
      editSuccess="Inspection record updated."
      deleteSuccess="Inspection record deleted."
    />
  )
}

export default QualityPage
