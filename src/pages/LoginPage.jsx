import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router'
import { login } from '../store/authSlice'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, status, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  if (user) {
    return <Navigate to={from} replace />
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(login({ email, password }))
  }

  const submitting = status === 'loading'

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
