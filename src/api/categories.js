import { request } from './client'

export function getCategories(page = 0, size = 20) {
  return request(`/categories?page=${page}&size=${size}`)
}
