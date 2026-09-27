import { request } from './client'

// Бэкенд отдаёт страницу: { content: [...], page, totalPages, ... }
export function getCategories(page = 0, size = 20) {
  return request(`/categories?page=${page}&size=${size}`)
}
