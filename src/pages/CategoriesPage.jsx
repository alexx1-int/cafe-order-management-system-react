import { useEffect, useState } from 'react'
import { getCategories } from '../api/categories'

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Загрузка...</p>
  }
  if (error) {
    return <p className="error">Ошибка: {error}</p>
  }

  return (
    <section>
      <div className="toolbar">
        <h2>Категории</h2>
        <button type="button">Добавить</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan={4} className="empty">Категорий пока нет</td>
            </tr>
          )}
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td className="actions">
                <button type="button">Изменить</button>
                <button type="button" className="danger">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default CategoriesPage
