import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Popconfirm, Space, Table, Tag } from 'antd'
import MenuItemForm from '../components/MenuItemForm'
import { fetchCategories, selectSortedCategories } from '../store/categoriesSlice'
import {
  createMenuItem,
  deleteMenuItem,
  fetchMenuItems,
  selectMenuCategoryFilters,
  selectMenuError,
  selectMenuStatus,
  selectSortedMenuItems,
  updateMenuItem,
} from '../store/menuSlice'

function MenuPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectSortedMenuItems)
  const categoryFilters = useSelector(selectMenuCategoryFilters)
  const categories = useSelector(selectSortedCategories)
  const status = useSelector(selectMenuStatus)
  const error = useSelector(selectMenuError)

  const [isCreating, setIsCreating] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deleteError, setDeleteError] = useState(null)

  useEffect(() => {
    dispatch(fetchMenuItems())
    dispatch(fetchCategories())
  }, [dispatch])

  async function handleCreate(item) {
    await dispatch(createMenuItem(item)).unwrap()
    setIsCreating(false)
  }

  async function handleUpdate(item) {
    await dispatch(updateMenuItem({ id: editingItem.id, item })).unwrap()
    setEditingItem(null)
  }

  async function handleDelete(id) {
    setDeleteError(null)
    try {
      await dispatch(deleteMenuItem(id)).unwrap()
    } catch (err) {
      setDeleteError(err.message)
    }
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name, 'ru'),
    },
    {
      title: 'Категория',
      dataIndex: 'categoryName',
      filters: categoryFilters,
      onFilter: (value, item) => item.categoryName === value,
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      render: (description) => description || '—',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price} ₽`,
    },
    {
      title: 'Наличие',
      dataIndex: 'available',
      filters: [
        { text: 'В наличии', value: true },
        { text: 'Нет в наличии', value: false },
      ],
      onFilter: (value, item) => item.available === value,
      render: (available) =>
        available ? <Tag color="green">В наличии</Tag> : <Tag color="red">Нет в наличии</Tag>,
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, item) => (
        <Space>
          <Button size="small" onClick={() => setEditingItem(item)}>
            Изменить
          </Button>
          <Popconfirm
            title={`Удалить «${item.name}»?`}
            okText="Удалить"
            cancelText="Отмена"
            okButtonProps={{ danger: true }}
            onConfirm={() => handleDelete(item.id)}
          >
            <Button size="small" danger>
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <section>
      <div className="toolbar">
        <h2>Меню</h2>
        <Button type="primary" onClick={() => setIsCreating(true)}>
          Добавить блюдо
        </Button>
      </div>

      {deleteError && (
        <Alert
          type="error"
          title={deleteError}
          closable
          onClose={() => setDeleteError(null)}
          style={{ marginBottom: 16 }}
        />
      )}

      {status === 'failed' ? (
        <Alert type="error" title="Не удалось загрузить меню" description={error} />
      ) : (
        <Table
          rowKey="id"
          columns={columns}
          dataSource={items}
          loading={status === 'idle' || status === 'loading'}
          pagination={{ pageSize: 10 }}
        />
      )}

      {isCreating && (
        <MenuItemForm
          title="Новое блюдо"
          categories={categories}
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingItem && (
        <MenuItemForm
          title="Изменить блюдо"
          initialValues={editingItem}
          categories={categories}
          onSubmit={handleUpdate}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </section>
  )
}

export default MenuPage
