import { NavLink, Outlet } from 'react-router'
function Layout({ user, onLogout }) {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <NavLink to="/categories">Категории</NavLink>
          <NavLink to="/menu">Меню</NavLink>
        </nav>
        <div className="user">
          <span>{user.name} ({user.role})</span>
          <button type="button" onClick={onLogout}>Выйти</button>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Layout
