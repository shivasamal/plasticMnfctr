import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const CrudModulePage = ({
  title,
  subtitle,
  initialRows,
  columns,
  actionLabel = 'Add Record',
  addSuccess = 'Record added successfully.',
  editSuccess = 'Record updated successfully.',
  deleteSuccess = 'Record deleted successfully.',
}) => {
  const { notify } = useOutletContext()
  const [rows, setRows] = useState(initialRows)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(columns.map((column) => [column.key, ''])),
  )

  const openCreate = () => {
    setEditIndex(-1)
    setFormData(Object.fromEntries(columns.map((column) => [column.key, ''])))
    setIsModalOpen(true)
  }

  const openEdit = (row, index) => {
    setEditIndex(index)
    setFormData(row)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditIndex(-1)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (editIndex >= 0) {
      setRows((prev) => prev.map((row, idx) => (idx === editIndex ? formData : row)))
      notify(editSuccess)
    } else {
      setRows((prev) => [formData, ...prev])
      notify(addSuccess)
    }
    closeModal()
  }

  const handleDelete = (index) => {
    setRows((prev) => prev.filter((_, idx) => idx !== index))
    notify(deleteSuccess)
  }

  const summary = useMemo(
    () => [
      { label: 'Total Records', value: rows.length },
      { label: 'Last Action', value: editIndex >= 0 ? 'Edit in progress' : 'Ready' },
    ],
    [rows.length, editIndex],
  )

  return (
    <section className="module-section">
      <div className="section-head">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <button className="ghost-btn" type="button" onClick={openCreate}>
          {actionLabel}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        {summary.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-3"
          >
            <p className="text-xs text-slate-500 m-0">{card.label}</p>
            <p className="text-xl font-semibold text-slate-800 m-0">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      type="button"
                      onClick={() => openEdit(row, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen ? (
        <div className="modal-backdrop-custom">
          <div className="modal-card-custom">
            <div className="modal-head">
              <h4>{editIndex >= 0 ? 'Edit Record' : 'Add Record'}</h4>
              <button type="button" className="btn btn-sm btn-light" onClick={closeModal}>
                Close
              </button>
            </div>
            <form className="row g-2" onSubmit={handleSubmit}>
              {columns.map((column) => (
                <div className="col-12 col-md-6" key={column.key}>
                  <label className="form-label">{column.label}</label>
                  <input
                    className="form-control"
                    value={formData[column.key] ?? ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [column.key]: e.target.value }))
                    }
                    required
                  />
                </div>
              ))}
              <div className="col-12 d-flex gap-2 justify-content-end mt-2">
                <button className="btn btn-outline-secondary" type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-dark" type="submit">
                  {editIndex >= 0 ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default CrudModulePage
