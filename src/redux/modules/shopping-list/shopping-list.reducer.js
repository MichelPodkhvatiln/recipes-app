import { createSlice } from '@reduxjs/toolkit'
import {
  addShoppingListItem,
  removeShoppingListItem,
  resetEditingShoppingListItem,
  startEditShoppingListItem,
  updateShoppingListItem
} from './shopping-list.actions'
import { updateShoppingListItemHelper } from './shopping-list.utils'

const INITIAL_STATE = {
  list: [],
  editingItemId: null
}

const slice = createSlice({
  name: 'shopping-list',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(addShoppingListItem, (state, action) => {
      state.list = [...state.list, action.payload]
    })

    builder.addCase(updateShoppingListItem, (state, action) => {
      const { list, editingItemId } = state

      state.list = updateShoppingListItemHelper(list, editingItemId, action.payload)
    })

    builder.addCase(removeShoppingListItem, (state, action) => {
      state.list = state.list.filter((listItem) => listItem.id !== action.payload)
    })

    builder.addCase(startEditShoppingListItem, (state, action) => {
      state.editingItemId = action.payload
    })

    builder.addCase(resetEditingShoppingListItem, (state) => {
      state.editingItemId = null
    })
  }
})

export default slice.reducer
