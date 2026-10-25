import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'
import menuReducer from './menuSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    menu: menuReducer,
  },
})
