import memoize from 'lodash.memoize'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../interfaces'

const selectShoppingList = (state: RootState) => state.shoppingList

export const selectShoppingListData = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.list
)

export const selectEditingListItemId = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.editingItemId
)

export const selectShoppingListItemById = memoize((listItemId: string | null) =>
  createSelector(
    [selectShoppingList],
    (shoppingList) => shoppingList.list.find((listItem) => listItem.id === listItemId)
  ))
