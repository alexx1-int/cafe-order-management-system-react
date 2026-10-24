import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login as loginRequest } from '../api/auth'
import { clearSession, getSession, saveSession } from '../api/session'

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const session = await loginRequest(email, password)
  saveSession(session)
  return session
})

export function logout() {
  return (dispatch) => {
    clearSession()
    dispatch(authSlice.actions.loggedOut())
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getSession(),
    status: 'idle',
    error: null,
  },
  reducers: {
    loggedOut(state) {
      state.user = null
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default authSlice.reducer
