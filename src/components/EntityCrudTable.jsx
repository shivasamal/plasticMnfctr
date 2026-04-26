import { useState } from 'react'

const EntityCrudTable = ({
  title,
  subtitle,
  rows,
  columns,
  fields,
  onAdd,
  onUpdate,
  onDelete,
  addLabel = 'Add',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({})

  const startCreate = () => {
    setEditing(null)
    setFormData(Object.fromEntries(fields.map((f) => [f.key, f.defaultValue ?? ''])))
    setIsOpen(true)
  }

  const startEdit = (row) => {
    setEditing(row)
    setFormData(Object.fromEntries(fields.map((f) => [f.key, row[f.key] ?? ''])))
    setIsOpen(true)
  }

  const submit = (e) => {
    e.preventDefault()
    if (editing) onUpdate(editing.id, formData)
    else onAdd(formData)
    setIsOpen(false)
  }

  return (
    <section className="module-section">
      <div className="section-head">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <button type="button" className="ghost-btn" onClick={startCreate}>
          {addLabel}
        </button>
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
            {rows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
                ))}
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => startEdit(row)}>
                      Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onDelete(row.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen ? (
        <div className="modal-backdrop-custom">
          <div className="modal-card-custom">
            <div className="modal-head">
              <h4>{editing ? 'Edit Record' : 'Add Record'}</h4>
              <button className="btn btn-sm btn-light" type="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
            <form className="row g-2" onSubmit={submit}>
              {fields.map((field) => (
                <div className="col-12 col-md-6" key={field.key}>
                  <label className="form-label">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className="form-select"
                      value={formData[field.key] ?? ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      required={field.required ?? true}
                    >
                      {(field.options ?? []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type ?? 'text'}
                      className="form-control"
                      value={formData[field.key] ?? ''}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      required={field.required ?? true}
                    />
                  )}
                </div>
              ))}
              <div className="col-12 d-flex justify-content-end gap-2">
                <button className="btn btn-outline-secondary" type="button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-dark" type="submit">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default EntityCrudTable
