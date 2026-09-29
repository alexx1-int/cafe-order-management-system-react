import { useState } from 'react'
import { clearSession, getSession, saveSession } from './api/session'
import CategoryTable from './components/CategoryTable'
import LoginForm from './components/LoginForm'
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
      <header className="header">
        <h1>Cafe Order Management</h1>
        {user && (
          <div className="user">
            <span>{user.name} ({user.role})</span>
            <button type="button" onClick={handleLogout}>Выйти</button>
          </div>
        )}
      </header>

      {user ? <CategoryTable /> : <LoginForm onLogin={handleLogin} />}
    </main>
  )
}

export default App
