import axios from 'axios'
import { clearSession, getSession } from './session'

export const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const session = getSession()
  if (session) {
    config.headers.Authorization = `Bearer ${session.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && getSession()) {
      clearSession()
      window.location.reload()
    }
    return Promise.reject(new Error(readError(error)))
  },
)

function readError(error) {
  const body = error.response?.data
  if (body?.error) {
    return body.error
  }
  if (body?.errors) {
    return Object.entries(body.errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join(', ')
  }
  return error.message
}
