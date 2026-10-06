import { useState } from 'react'
import Modal from './Modal'

function ConfirmDialog({ title, message, confirmLabel = 'Удалить', onConfirm, onCancel }) {
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleConfirm() {
    setError(null)
    setSubmitting(true)
    try {
      await onConfirm()
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <Modal title={title} onClose={onCancel}>
      <p>{message}</p>

      {error && <p className="error">{error}</p>}

      <div className="form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Отмена
        </button>
        <button type="button" className="danger" onClick={handleConfirm} disabled={submitting}>
          {submitting ? 'Удаляем...' : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
