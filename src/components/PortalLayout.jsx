import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { moduleConfig, moduleNav } from '../data/erpData'

const PortalLayout = ({ onLogout }) => {
  const [toast, setToast] = useState({
    message: 'Logged in successfully. Welcome to the ERP portal.',
    tone: 'success',
    moduleKey: 'dashboard',
  })
  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname.split('/').pop()
  const currentKey = route && moduleConfig[route] ? route : 'dashboard'

  const notify = (message, tone = 'success') => {
    setToast({ message, tone, moduleKey: currentKey })
  }

  useEffect(() => {
    if (!toast?.message) return undefined
    const timeoutId = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, message: '' }))
    }, 2800)
    return () => window.clearTimeout(timeoutId)
  }, [toast?.message, currentKey])

  return (
    <main className="app-shell portal">
      <section className="surface-panel">
        <header className="panel-header">
          <div className="rounded-xl bg-white/70 border border-slate-200 px-3 py-2">
            <p className="eyebrow">Plastic Manufacturing ERP</p>
            <h2>ERP Portal</h2>
          </div>
          <button className="ghost-btn" type="button" onClick={onLogout}>
            Log out
          </button>
        </header>
        <div className="portal-layout row g-3 m-0">
          <aside className="col-12 col-lg-3 col-xl-2 p-0">
            <div className="sidebar">
              <h3>Modules</h3>
              <nav>
                {moduleNav.map((module) => (
                  <button
                    className={module.key === currentKey ? 'module-link active' : 'module-link'}
                    key={module.key}
                    type="button"
                    onClick={() => navigate(module.path)}
                  >
                    {module.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
          <div className="col-12 col-lg-9 col-xl-10 p-0">
            <div className="portal-content">
              <article className="panel-card module-header">
                <h3>{moduleConfig[currentKey].title}</h3>
                <p>{moduleConfig[currentKey].subtitle}</p>
              </article>
              <Outlet context={{ notify }} />
            </div>
          </div>
        </div>
      </section>
      {toast?.message && toast.moduleKey === currentKey ? (
        <div className={`app-toast ${toast.tone === 'error' ? 'error' : 'success'}`}>
          <strong>{toast.tone === 'error' ? 'Alert' : 'Success'}:</strong> {toast.message}
        </div>
      ) : null}
    </main>
  )
}

export default PortalLayout
