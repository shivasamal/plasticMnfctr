import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CREDENTIALS } from '../data/erpData'

const LoginPage = ({ onLogin, isRedirecting }) => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = formData.username.trim().toLowerCase()
    if (user === CREDENTIALS.username && formData.password === CREDENTIALS.password) {
      setError('')
      onLogin(() => navigate('/portal/dashboard'))
      return
    }
    setError('Invalid credentials. Please use authorized ERP access details.')
  }

  return (
    <main className="app-shell login">
      <section className="surface-panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Plastic Manufacturing ERP</p>
            <h2>Sign in to continue</h2>
          </div>
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Corporate Email</label>
          <input
            id="username"
            type="email"
            value={formData.username}
            onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="name@polymerp.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Enter secure password"
            required
          />
          <p className="hint">Demo login: admin@polymerp.com / Plastics@2026</p>
          {error ? <p className="error-text">{error}</p> : null}
          <button className="primary-btn" type="submit">
            {isRedirecting ? 'Redirecting to portal...' : 'Access ERP'}
          </button>
          {isRedirecting ? (
            <p className="redirect-note">Authentication successful. Redirecting to ERP portal...</p>
          ) : null}
        </form>
      </section>
    </main>
  )
}

export default LoginPage
