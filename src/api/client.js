import { clearSession, getSession } from './session'

export async function request(path, options = {}) {
  const session = getSession()

  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(session && { Authorization: `Bearer ${session.token}` }),
      ...options.headers,
    },
  })

  if (!response.ok) {
    if (response.status === 401 && session) {
      clearSession()
      window.location.reload()
    }
    throw new Error(await readError(response))
  }

  if (response.status === 204) {
    return null
  }
  return response.json()
}

async function readError(response) {
  const text = await response.text()
  try {
    const body = JSON.parse(text)
    if (body.error) {
      return body.error
    }
    if (body.errors) {
      return Object.entries(body.errors)
        .map(([field, message]) => `${field}: ${message}`)
        .join(', ')
    }
  } catch {
  }
  return text || `HTTP ${response.status}`
}
