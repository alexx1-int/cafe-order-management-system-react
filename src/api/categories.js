import { api } from './client'

export async function getCategories(page = 0, size = 20) {
  const response = await api.get('/categories', { params: { page, size } })
  return response.data
}

export async function createCategory(category) {
  const response = await api.post('/categories', category)
  return response.data
}

export async function updateCategory(id, category) {
  const response = await api.put(`/categories/${id}`, category)
  return response.data
}

export async function deleteCategory(id) {
  await api.delete(`/categories/${id}`)
}
