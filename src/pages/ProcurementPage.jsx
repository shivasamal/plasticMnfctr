import CrudModulePage from '../components/CrudModulePage'
import { procurementData } from '../data/erpData'

const ProcurementPage = () => {
  return (
    <CrudModulePage
      title="Purchase Orders"
      subtitle="Manage vendors, PO updates, and ETA changes."
      initialRows={procurementData}
      columns={[
        { key: 'po', label: 'PO Number' },
        { key: 'vendor', label: 'Vendor' },
        { key: 'material', label: 'Material' },
        { key: 'qty', label: 'Qty' },
        { key: 'eta', label: 'ETA' },
        { key: 'status', label: 'Status' },
      ]}
      actionLabel="New PO"
      addSuccess="Purchase order added successfully."
      editSuccess="Purchase order updated successfully."
      deleteSuccess="Purchase order cancelled."
    />
  )
}

export default ProcurementPage
