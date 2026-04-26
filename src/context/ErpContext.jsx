import { createContext, useContext, useMemo, useState } from 'react'

const ErpContext = createContext(null)

const initialData = {
  users: [
    { id: 'U001', name: 'Amit Verma', role: 'Admin', login: 'admin@polymerp.com' },
    { id: 'U014', name: 'R. Thomas', role: 'Shift Manager', login: 'manager1@polymerp.com' },
    { id: 'U022', name: 'M. Khan', role: 'Operator', login: 'operator1@polymerp.com' },
    { id: 'U031', name: 'Neha Jain', role: 'Warehouse Staff', login: 'store1@polymerp.com' },
  ],
  products: [
    { id: 'P100', product_name: 'PP-Crate-45L', type: 'Finished Good' },
    { id: 'P210', product_name: 'PET-Bottle-2L', type: 'Finished Good' },
    { id: 'P330', product_name: 'PVC-Pipe-110', type: 'Finished Good' },
  ],
  machines: [
    { id: 'M01', machine_name: 'Injection A' },
    { id: 'M02', machine_name: 'Blow Molding 2' },
    { id: 'M03', machine_name: 'Extrusion C' },
  ],
  shifts: [
    { id: 'S1', shift_name: 'Day', start_time: '06:00', end_time: '14:00' },
    { id: 'S2', shift_name: 'Evening', start_time: '14:00', end_time: '22:00' },
    { id: 'S3', shift_name: 'Night', start_time: '22:00', end_time: '06:00' },
  ],
  production: [
    {
      id: 'PR001',
      date: '2026-04-25',
      shift_id: 'S1',
      machine_id: 'M01',
      product_id: 'P100',
      quantity: 5200,
      manager_id: 'U014',
      status: 'open',
    },
    {
      id: 'PR002',
      date: '2026-04-25',
      shift_id: 'S2',
      machine_id: 'M02',
      product_id: 'P210',
      quantity: 8400,
      manager_id: 'U014',
      status: 'open',
    },
  ],
  batches: [
    {
      id: 'B001',
      batch_code: '20260423-S1-M01-P100',
      date: '2026-04-23',
      shift_id: 'S1',
      machine_id: 'M01',
      product_id: 'P100',
      quantity: 4100,
    },
    {
      id: 'B002',
      batch_code: '20260424-S1-M02-P210',
      date: '2026-04-24',
      shift_id: 'S1',
      machine_id: 'M02',
      product_id: 'P210',
      quantity: 7200,
    },
  ],
  inventory: [
    { id: 'I001', batch_id: 'B001', quantity: 3100, location: 'FG-A1' },
    { id: 'I002', batch_id: 'B002', quantity: 6400, location: 'FG-B4' },
  ],
  dispatch: [
    {
      id: 'D001',
      batch_id: 'B001',
      quantity: 1000,
      customer: 'Prime Pack Ltd',
      dispatched_by: 'U031',
      date: '2026-04-24',
    },
  ],
}

const nextId = (prefix, list) => {
  const maxNum = list.reduce((max, item) => {
    const raw = String(item.id ?? '')
    const num = Number.parseInt(raw.replace(/^\D+/, ''), 10)
    return Number.isFinite(num) ? Math.max(max, num) : max
  }, 0)
  return `${prefix}${String(maxNum + 1).padStart(3, '0')}`
}

export const ErpProvider = ({ children }) => {
  const [users, setUsers] = useState(initialData.users)
  const [products, setProducts] = useState(initialData.products)
  const [machines, setMachines] = useState(initialData.machines)
  const [shifts, setShifts] = useState(initialData.shifts)
  const [production, setProduction] = useState(initialData.production)
  const [batches, setBatches] = useState(initialData.batches)
  const [inventory, setInventory] = useState(initialData.inventory)
  const [dispatch, setDispatch] = useState(initialData.dispatch)

  const lookup = useMemo(
    () => ({
      productName: Object.fromEntries(products.map((p) => [p.id, p.product_name])),
      machineName: Object.fromEntries(machines.map((m) => [m.id, m.machine_name])),
      shiftName: Object.fromEntries(shifts.map((s) => [s.id, s.shift_name])),
      userName: Object.fromEntries(users.map((u) => [u.id, u.name])),
    }),
    [products, machines, shifts, users],
  )

  const crudFactory = (setter, getList) => ({
    add: (data, prefix) => setter((prev) => [{ id: nextId(prefix, prev), ...data }, ...prev]),
    update: (id, data) => setter((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item))),
    remove: (id) => setter((prev) => prev.filter((item) => item.id !== id)),
    rows: getList,
  })

  const userCrud = crudFactory(setUsers, users)
  const productCrud = crudFactory(setProducts, products)
  const machineCrud = crudFactory(setMachines, machines)
  const shiftCrud = crudFactory(setShifts, shifts)
  const productionCrud = crudFactory(setProduction, production)

  const generateBatchesForShift = (shiftId, dateStr) => {
    const pending = production.filter((p) => p.shift_id === shiftId && p.status === 'open')
    if (pending.length === 0) return { ok: false, message: 'No open production rows for selected shift.' }

    const grouped = pending.reduce((acc, row) => {
      const key = `${row.machine_id}::${row.product_id}`
      if (!acc[key]) {
        acc[key] = {
          machine_id: row.machine_id,
          product_id: row.product_id,
          quantity: 0,
        }
      }
      acc[key].quantity += Number(row.quantity)
      return acc
    }, {})

    const groupedRows = Object.values(grouped)

    const newBatches = groupedRows.map((p, idx) => {
      const batch_code = `${dateStr.replaceAll('-', '')}-${shiftId}-${p.machine_id}-${p.product_id}-${idx + 1}`
      return {
        id: nextId('B', [...batches, ...Array(idx).fill({ id: `B${idx}` })]),
        batch_code,
        date: dateStr,
        shift_id: shiftId,
        machine_id: p.machine_id,
        product_id: p.product_id,
        quantity: p.quantity,
      }
    })

    setBatches((prev) => [...newBatches, ...prev])
    setInventory((prev) => [
      ...newBatches.map((b, idx) => ({
        id: nextId('I', [...prev, ...Array(idx).fill({ id: `I${idx}` })]),
        batch_id: b.id,
        quantity: b.quantity,
        location: 'FG-NEW',
      })),
      ...prev,
    ])
    setProduction((prev) =>
      prev.map((p) => (p.shift_id === shiftId && p.status === 'open' ? { ...p, status: 'closed' } : p)),
    )

    return {
      ok: true,
      message: `${newBatches.length} batch(es) generated from ${pending.length} production row(s) and stocked inward.`,
    }
  }

  const createDispatchFIFO = ({ product_id, quantity, customer, dispatched_by, date }) => {
    let remaining = Number(quantity)
    if (!Number.isFinite(remaining) || remaining <= 0) {
      return { ok: false, message: 'Dispatch quantity must be a positive number.' }
    }

    const inventoryWithBatch = inventory
      .map((inv) => {
        const batch = batches.find((b) => b.id === inv.batch_id)
        return { ...inv, batch }
      })
      .filter((entry) => entry.batch && entry.batch.product_id === product_id && entry.quantity > 0)
      .sort((a, b) => new Date(a.batch.date) - new Date(b.batch.date))

    const totalAvailable = inventoryWithBatch.reduce((sum, row) => sum + row.quantity, 0)
    if (totalAvailable < remaining) {
      return { ok: false, message: 'Insufficient FIFO stock for dispatch quantity.' }
    }

    const updates = {}
    const dispatchRows = []

    for (const row of inventoryWithBatch) {
      if (remaining <= 0) break
      const picked = Math.min(remaining, row.quantity)
      remaining -= picked
      updates[row.id] = (updates[row.id] ?? row.quantity) - picked
      dispatchRows.push({
        id: nextId('D', [...dispatch, ...dispatchRows, { id: `D${dispatchRows.length}` }]),
        batch_id: row.batch_id,
        quantity: picked,
        customer,
        dispatched_by,
        date,
      })
    }

    setInventory((prev) =>
      prev.map((inv) => (updates[inv.id] !== undefined ? { ...inv, quantity: updates[inv.id] } : inv)),
    )
    setDispatch((prev) => [...dispatchRows, ...prev])
    return { ok: true, message: `Dispatch created using FIFO across ${dispatchRows.length} batch(es).` }
  }

  const value = {
    users,
    products,
    machines,
    shifts,
    production,
    batches,
    inventory,
    dispatch,
    lookup,
    userCrud,
    productCrud,
    machineCrud,
    shiftCrud,
    productionCrud,
    setBatches,
    setInventory,
    generateBatchesForShift,
    createDispatchFIFO,
  }

  return <ErpContext.Provider value={value}>{children}</ErpContext.Provider>
}

export const useErp = () => {
  const ctx = useContext(ErpContext)
  if (!ctx) throw new Error('useErp must be used inside ErpProvider')
  return ctx
}
