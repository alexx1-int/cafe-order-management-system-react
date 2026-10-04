import { api } from './client'

export async function getCategories(page = 0, size = 20) {
  const response = await api.get('/categories', { params: { page, size } })
  return response.data
}
