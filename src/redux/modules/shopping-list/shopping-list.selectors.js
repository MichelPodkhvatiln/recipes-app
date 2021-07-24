import memoize from 'lodash.memoize'
import { createSelector } from '@reduxjs/toolkit'

const selectShoppingList = (state) => state.shoppingList

export const selectShoppingListData = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.list
)

export const selectEditingListItemId = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.editingItemId
)

export const selectShoppingListItemById = memoize((listItemId) =>
  createSelector(
    [selectShoppingList],
    (shoppingList) => shoppingList.list.find((listItem) => listItem.id === listItemId)
  ))
