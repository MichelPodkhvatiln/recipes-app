import ShoppingListActionsTypes from './shopping-list.actions.types'

export const addShoppingListItem = (newListItemData) => ({
  type: ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM,
  payload: newListItemData
})

export const removeShoppingListItem = (removeListItemId) => ({
  type: ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM,
  payload: removeListItemId
})

export const updateShoppingListItem = (updatedListItemData) => ({
  type: ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM,
  payload: updatedListItemData
})
