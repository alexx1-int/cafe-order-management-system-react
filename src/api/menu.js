import { api } from './client'

export async function getMenuItems(page = 0, size = 100) {
  const response = await api.get('/menu', { params: { page, size } })
  return response.data
}

export async function createMenuItem(item) {
  const response = await api.post('/menu', item)
  return response.data
}

export async function updateMenuItem(id, item) {
  const response = await api.put(`/menu/${id}`, item)
  return response.data
}

export async function deleteMenuItem(id) {
  await api.delete(`/menu/${id}`)
}
