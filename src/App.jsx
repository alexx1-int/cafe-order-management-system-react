import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { clearSession, getSession, saveSession } from './api/session'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import CategoriesPage from './pages/CategoriesPage'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  const [user, setUser] = useState(() => getSession())

  function handleLogin(session) {
    saveSession(session)
    setUser(session)
  }

  function handleLogout() {
    clearSession()
    setUser(null)
  }

  return (
    <main className="container">
      <h1>Cafe Order Management</h1>

      <Routes>
        <Route path="/login" element={<LoginPage user={user} onLogin={handleLogin} />} />

        <Route
          element={
            <PrivateRoute user={user}>
              <Layout user={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/categories" replace />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  )
}

export default App
