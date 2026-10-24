import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from '../components/CategoryForm'
import ConfirmDialog from '../components/ConfirmDialog'
import Modal from '../components/Modal'
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../store/categoriesSlice'

function CategoriesPage() {
  const { items: categories, status, error } = useSelector((state) => state.categories)
  const dispatch = useDispatch()

  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [deletingCategory, setDeletingCategory] = useState(null)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  async function handleCreate(category) {
    await dispatch(createCategory(category)).unwrap()
    setIsCreating(false)
  }

  async function handleUpdate(category) {
    await dispatch(updateCategory({ id: editingCategory.id, category })).unwrap()
    setEditingCategory(null)
  }

  async function handleDelete() {
    await dispatch(deleteCategory(deletingCategory.id)).unwrap()
    setDeletingCategory(null)
  }

  if (status === 'idle' || status === 'loading') {
    return <p>Загрузка...</p>
  }
  if (status === 'failed') {
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
