const TableModule = ({ title, subtitle, rows, columns, actionLabel, onAction }) => (
  <section className="module-section">
    <div className="section-head">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <button className="ghost-btn" onClick={onAction} type="button">
        {actionLabel}
      </button>
    </div>
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={`${title}-${idx}`}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)

export default TableModule
