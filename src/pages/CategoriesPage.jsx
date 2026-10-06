import { useEffect, useState } from 'react'
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../api/categories'
import CategoryForm from '../components/CategoryForm'
import ConfirmDialog from '../components/ConfirmDialog'
import Modal from '../components/Modal'

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.content))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(category) {
    const created = await createCategory(category)
    setCategories((prev) => [...prev, created])
    setIsCreating(false)
  }

  async function handleUpdate(category) {
    const updated = await updateCategory(editingCategory.id, category)
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    setEditingCategory(null)
  }

  async function handleDelete() {
    await deleteCategory(deletingCategory.id)
    setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id))
    setDeletingCategory(null)
  }

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
        <button type="button" onClick={() => setIsCreating(true)}>Добавить</button>
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
                <button type="button" onClick={() => setEditingCategory(category)}>
                  Изменить
                </button>
                <button
                  type="button"
                  className="danger"
                  onClick={() => setDeletingCategory(category)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isCreating && (
        <Modal title="Новая категория" onClose={() => setIsCreating(false)}>
          <CategoryForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        </Modal>
      )}

      {editingCategory && (
        <Modal title="Редактирование категории" onClose={() => setEditingCategory(null)}>
          <CategoryForm
            initialValues={editingCategory}
            onSubmit={handleUpdate}
            onCancel={() => setEditingCategory(null)}
          />
        </Modal>
      )}

      {deletingCategory && (
        <ConfirmDialog
          title="Удаление категории"
          message={`Удалить категорию «${deletingCategory.name}»?`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingCategory(null)}
        />
      )}
    </section>
  )
}

export default CategoriesPage
