export const CREDENTIALS = {
  username: 'admin@polymerp.com',
  password: 'Plastics@2026',
}

export const moduleNav = [
  { key: 'dashboard', label: 'Dashboard', path: '/portal/dashboard' },
  { key: 'users', label: 'User & Roles', path: '/portal/users' },
  { key: 'master', label: 'Master Data', path: '/portal/master' },
  { key: 'production', label: 'Production', path: '/portal/production' },
  { key: 'batches', label: 'Batch Register', path: '/portal/batches' },
  { key: 'inventory', label: 'Inventory', path: '/portal/inventory' },
  { key: 'dispatch', label: 'Dispatch (FIFO)', path: '/portal/dispatch' },
]

export const moduleConfig = {
  dashboard: { title: 'Real-Time Dashboard', subtitle: 'Production, machine, inventory and dispatch intelligence.' },
  users: { title: 'User & Role Management', subtitle: 'Admin, shift manager, operator, warehouse roles.' },
  master: { title: 'Master Data', subtitle: 'Products, machines and shifts configuration.' },
  production: { title: 'Production Tracking', subtitle: 'Shift-wise output capture with manager accountability.' },
  batches: { title: 'Batch Generation', subtitle: 'Auto-generated batch code registry from closed shifts.' },
  inventory: { title: 'Inventory Management', subtitle: 'FIFO-ready batch stock with location visibility.' },
  dispatch: { title: 'Outward / Dispatch', subtitle: 'FIFO dispatch and customer-level tracking.' },
}

export const dashboardKpis = [
  { label: 'Daily Output', value: '124.5 T', trend: '+8.2%' },
  { label: 'Machine Uptime', value: '96.8%', trend: '+1.1%' },
  { label: 'Scrap Rate', value: '1.9%', trend: '-0.4%' },
  { label: 'Open Orders', value: '312', trend: '+2.4%' },
]

export const productionTrend = [
  { day: 'Mon', value: 82 },
  { day: 'Tue', value: 88 },
  { day: 'Wed', value: 91 },
  { day: 'Thu', value: 85 },
  { day: 'Fri', value: 94 },
  { day: 'Sat', value: 97 },
]

export const materialMix = [
  { name: 'PP', percent: 42, color: '#2563eb' },
  { name: 'HDPE', percent: 24, color: '#0ea5e9' },
  { name: 'PVC', percent: 18, color: '#14b8a6' },
  { name: 'Additives', percent: 16, color: '#8b5cf6' },
]

export const productionLines = [
  { line: 'Injection A', sku: 'PP-Crate-45L', shift: 'Day', status: 'Running', oee: '93%' },
  { line: 'Blow Molding 2', sku: 'PET-Bottle-2L', shift: 'Night', status: 'Setup', oee: '88%' },
  { line: 'Extrusion C', sku: 'PVC-Pipe-110', shift: 'Day', status: 'Running', oee: '95%' },
]

export const stockData = [
  { material: 'PP Resin H120', type: 'Raw Material', stock: '18.2 T', reorder: '12 T', location: 'RM Bay 01' },
  { material: 'HDPE Granules M501', type: 'Raw Material', stock: '9.7 T', reorder: '8 T', location: 'RM Bay 02' },
  { material: 'Blue Masterbatch MB-22', type: 'Additive', stock: '740 KG', reorder: '500 KG', location: 'Additive Rack' },
  { material: 'PVC Stabilizer ST-9', type: 'Chemical', stock: '320 KG', reorder: '200 KG', location: 'Chemical Safe' },
]

export const procurementData = [
  { po: 'PO-2026-1142', vendor: 'Reliance Polymers', material: 'PP Resin H120', qty: '15 T', eta: '28 Apr', status: 'Approved' },
  { po: 'PO-2026-1147', vendor: 'Colorchem Pvt Ltd', material: 'Blue Masterbatch MB-22', qty: '1.2 T', eta: '29 Apr', status: 'Pending' },
  { po: 'PO-2026-1151', vendor: 'ChemBond Industries', material: 'PVC Stabilizer ST-9', qty: '500 KG', eta: '01 May', status: 'In Transit' },
]

export const planningData = [
  { batch: 'B-PP-4481', machine: 'Injection A', product: 'Industrial Crate 45L', qty: '14,000 pcs', start: '26 Apr 08:00', status: 'Running' },
  { batch: 'B-PET-2197', machine: 'Blow 2', product: '2L Water Bottle', qty: '28,000 pcs', start: '26 Apr 20:00', status: 'Scheduled' },
  { batch: 'B-PVC-9202', machine: 'Extrusion C', product: 'PVC Pipe 110mm', qty: '12.5 T', start: '27 Apr 06:00', status: 'Planned' },
]

export const qualityData = [
  { lot: 'LOT-P1032', test: 'Dimension Check', result: 'Pass', inspector: 'R. Thomas', action: 'Released' },
  { lot: 'LOT-P1035', test: 'Color Delta E', result: 'Warning', inspector: 'A. Sharma', action: 'Rework Review' },
  { lot: 'LOT-P1037', test: 'Burst Pressure', result: 'Pass', inspector: 'M. Khan', action: 'Released' },
]

export const maintenanceData = [
  { ticket: 'MWO-772', equipment: 'Injection A - Clamp Unit', type: 'Preventive', due: '27 Apr', status: 'Open' },
  { ticket: 'MWO-781', equipment: 'Blow 2 - Heater Bank', type: 'Breakdown', due: 'Today', status: 'In Progress' },
  { ticket: 'MWO-788', equipment: 'Chiller Line 1', type: 'Calibration', due: '29 Apr', status: 'Scheduled' },
]

export const dispatchData = [
  { challan: 'DC-4402', customer: 'Prime Pack Ltd', product: 'PP-Crate-45L', qty: '3,500 pcs', vehicle: 'MH12AB6641', status: 'Ready' },
  { challan: 'DC-4407', customer: 'AquaPure Foods', product: 'PET-Bottle-2L', qty: '9,000 pcs', vehicle: 'GJ05PT1022', status: 'Loaded' },
  { challan: 'DC-4411', customer: 'Metro Infra', product: 'PVC-Pipe-110', qty: '2.2 T', vehicle: 'RJ14TX9121', status: 'In Transit' },
]

export const salesData = [
  { so: 'SO-3904', customer: 'Prime Pack Ltd', value: 'INR 14.8L', due: '30 Apr', stage: 'Confirmed' },
  { so: 'SO-3912', customer: 'AquaPure Foods', value: 'INR 9.2L', due: '29 Apr', stage: 'Dispatching' },
  { so: 'SO-3921', customer: 'GreenBuild Systems', value: 'INR 18.6L', due: '03 May', stage: 'Production' },
]

export const financeData = [
  { doc: 'INV-8102', party: 'Prime Pack Ltd', type: 'Receivable', amount: 'INR 14.8L', status: 'Open' },
  { doc: 'BILL-2207', party: 'Reliance Polymers', type: 'Payable', amount: 'INR 11.3L', status: 'Due' },
  { doc: 'INV-8108', party: 'AquaPure Foods', type: 'Receivable', amount: 'INR 9.2L', status: 'Part Paid' },
]

export const reportData = [
  { report: 'Daily Production MIS', owner: 'Operations', frequency: 'Daily', lastRun: '26 Apr 17:00' },
  { report: 'Material Consumption vs BOM', owner: 'Planning', frequency: 'Daily', lastRun: '26 Apr 16:30' },
  { report: 'AR/AP Aging', owner: 'Finance', frequency: 'Weekly', lastRun: '25 Apr 18:00' },
]
