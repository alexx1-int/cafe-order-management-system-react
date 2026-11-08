import { useState } from 'react'
import { Alert, Form, Input, InputNumber, Modal, Select, Switch } from 'antd'

const EMPTY_ITEM = { name: '', description: '', price: null, available: true, categoryId: null }

function MenuItemForm({ title, initialValues = EMPTY_ITEM, categories, onSubmit, onCancel }) {
  const [form] = Form.useForm()
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  async function handleFinish(values) {
    setError(null)
    setSubmitting(true)
    try {
      await onSubmit({
        ...values,
        name: values.name.trim(),
        description: values.description?.trim() || null,
      })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <Modal
      open
      title={title}
      okText="Сохранить"
      cancelText="Отмена"
      confirmLoading={submitting}
      onOk={() => form.submit()}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" initialValues={initialValues} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Название"
          rules={[{ required: true, whitespace: true, message: 'Введите название' }]}
        >
          <Input autoFocus />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Категория"
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select options={categoryOptions} placeholder="Выберите категорию" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Цена, ₽"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <InputNumber min={0.01} step={10} precision={2} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="available" label="В наличии" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>

      {error && <Alert type="error" title={error} />}
    </Modal>
  )
}

export default MenuItemForm
