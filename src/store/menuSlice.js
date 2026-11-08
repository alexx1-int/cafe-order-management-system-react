import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import * as menuApi from '../api/menu'

export const fetchMenuItems = createAsyncThunk(
  'menu/fetch',
  async () => {
    const data = await menuApi.getMenuItems()
    return data.content
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().menu
      return status === 'idle' || status === 'failed'
    },
  },
)

export const createMenuItem = createAsyncThunk('menu/create', (item) =>
  menuApi.createMenuItem(item),
)

export const updateMenuItem = createAsyncThunk('menu/update', ({ id, item }) =>
  menuApi.updateMenuItem(id, item),
)

export const deleteMenuItem = createAsyncThunk('menu/delete', async (id) => {
  await menuApi.deleteMenuItem(id)
  return id
})

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export default menuSlice.reducer

export const selectMenuItems = (state) => state.menu.items
export const selectMenuStatus = (state) => state.menu.status
export const selectMenuError = (state) => state.menu.error

export const selectSortedMenuItems = createSelector([selectMenuItems], (items) =>
  [...items].sort(
    (a, b) =>
      (a.categoryName ?? '').localeCompare(b.categoryName ?? '', 'ru') ||
      a.name.localeCompare(b.name, 'ru'),
  ),
)

export const selectMenuCategoryFilters = createSelector([selectMenuItems], (items) =>
  [...new Set(items.map((item) => item.categoryName))]
    .sort((a, b) => a.localeCompare(b, 'ru'))
    .map((name) => ({ text: name, value: name })),
)
