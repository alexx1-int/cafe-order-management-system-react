function Spinner({ label = 'Загрузка...', small = false }) {
  return (
    <span className={small ? 'spinner-wrap small' : 'spinner-wrap'} role="status">
      <span className="spinner" />
      {label}
    </span>
  )
}

export default Spinner
