import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router'
import { logout } from '../store/authSlice'

function Layout() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  return (
    <>
      <header className="header">
        <nav className="nav">
          <NavLink to="/categories">Категории</NavLink>
          <NavLink to="/menu">Меню</NavLink>
        </nav>
        <div className="user">
          <span>{user.name} ({user.role})</span>
          <button type="button" onClick={() => dispatch(logout())}>Выйти</button>
        </div>
      </header>

      <Outlet />
    </>
  )
}

export default Layout
