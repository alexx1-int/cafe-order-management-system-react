import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import CategoriesPage from './pages/CategoriesPage'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <main className="container">
      <h1>Cafe Order Management</h1>

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <PrivateRoute>
              <Layout />
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
