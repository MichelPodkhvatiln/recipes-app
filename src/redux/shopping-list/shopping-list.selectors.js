import { createSelector } from 'reselect'

const selectShoppingList = (state) => state.shoppingList

export const selectShoppingListData = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.list
)

export const selectEditingListItem = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.editingItem
)
