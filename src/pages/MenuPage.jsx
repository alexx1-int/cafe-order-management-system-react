import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Table, Tag } from 'antd'
import {
  fetchMenuItems,
  selectMenuCategoryFilters,
  selectMenuError,
  selectMenuStatus,
  selectSortedMenuItems,
} from '../store/menuSlice'

function MenuPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectSortedMenuItems)
  const categoryFilters = useSelector(selectMenuCategoryFilters)
  const status = useSelector(selectMenuStatus)
  const error = useSelector(selectMenuError)

  useEffect(() => {
    dispatch(fetchMenuItems())
  }, [dispatch])

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
  ]

  return (
    <section>
      <h2>Меню</h2>
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
    </section>
  )
}

export default MenuPage
