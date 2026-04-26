import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import PortalLayout from './components/PortalLayout'
import { ErpProvider } from './context/ErpContext'
import BatchPage from './pages/BatchPage'
import DashboardPage from './pages/DashboardPage'
import DispatchPage from './pages/DispatchPage'
import InventoryPage from './pages/InventoryPage'
import LoginPage from './pages/LoginPage'
import MasterDataPage from './pages/MasterDataPage'
import ProductionPage from './pages/ProductionPage'
import UserRolesPage from './pages/UserRolesPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const loginRedirect = useMemo(() => '/portal/dashboard', [])

  const handleLogin = (onComplete) => {
    setIsRedirecting(true)
    window.setTimeout(() => {
      setIsAuthenticated(true)
      setIsRedirecting(false)
      onComplete()
    }, 900)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsRedirecting(false)
  }

  return (
    <ErpProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} isRedirecting={isRedirecting} />}
          />
          <Route
            path="/portal"
            element={
              isAuthenticated ? <PortalLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />
            }
          >
            <Route index element={<Navigate to="/portal/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UserRolesPage />} />
            <Route path="master" element={<MasterDataPage />} />
            <Route path="production" element={<ProductionPage />} />
            <Route path="batches" element={<BatchPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="dispatch" element={<DispatchPage />} />
          </Route>
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? loginRedirect : '/login'} replace />}
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? loginRedirect : '/login'} replace />}
          />
        </Routes>
      </BrowserRouter>
    </ErpProvider>
  )
}

export default App
