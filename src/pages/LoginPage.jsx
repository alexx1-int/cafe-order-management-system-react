import { useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { login } from '../api/auth'

function LoginPage({ user, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  if (user) {
    return <Navigate to={from} replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const session = await login(email, password)
      onLogin(session)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form className="form login-form" onSubmit={handleSubmit}>
      <h2>Вход</h2>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Пароль
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Входим...' : 'Войти'}
      </button>
    </form>
  )
}

export default LoginPage
