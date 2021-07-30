import { createSlice } from '@reduxjs/toolkit'

import { IShoppingListItem, IShoppingListState } from '../../../interfaces'

import {
  addShoppingListItem,
  removeShoppingListItem,
  resetEditingShoppingListItem,
  startEditShoppingListItem,
  updateShoppingListItem
} from './shopping-list.actions'

const initialState: IShoppingListState = {
  list: [],
  editingItemId: null
}

const slice = createSlice({
  name: 'shopping-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addShoppingListItem, (state, action) => {
      state.list.push(action.payload)
    })

    builder.addCase(updateShoppingListItem, (state, action) => {
      const { list, editingItemId } = state

      if (!editingItemId) return

      const editingItemIndex = list.findIndex((listItem) => listItem.id === editingItemId)

      if (editingItemIndex < 0) return

      const updatedListItem: IShoppingListItem = {
        ...action.payload,
        id: editingItemId
      }

      list.splice(editingItemIndex, 1, updatedListItem)
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
