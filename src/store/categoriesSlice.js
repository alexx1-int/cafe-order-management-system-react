import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as categoriesApi from '../api/categories'

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const data = await categoriesApi.getCategories()
    return data.content
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().categories
      return status === 'idle' || status === 'failed'
    },
  },
)

export const createCategory = createAsyncThunk('categories/create', (category) =>
  categoriesApi.createCategory(category),
)

export const updateCategory = createAsyncThunk('categories/update', ({ id, category }) =>
  categoriesApi.updateCategory(id, category),
)

export const deleteCategory = createAsyncThunk('categories/delete', async (id) => {
  await categoriesApi.deleteCategory(id)
  return id
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload)
      })
  },
})

export default categoriesSlice.reducer
