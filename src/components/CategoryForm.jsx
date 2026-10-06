import { useState } from 'react'

const EMPTY_CATEGORY = { name: '', description: '' }

function CategoryForm({ initialValues = EMPTY_CATEGORY, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues.name)
  const [description, setDescription] = useState(initialValues.description ?? '')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || null,
      })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Название
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />
      </label>

      <label>
        Описание
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Отмена
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Сохраняем...' : 'Сохранить'}
        </button>
      </div>
    </form>
  )
}

export default CategoryForm
