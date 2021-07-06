import ShoppingListActionsTypes from './shopping-list.actions.types'

export const addShoppingListItem = (newListItemData) => ({
  type: ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM,
  payload: newListItemData
})

export const editShoppingListItem = (editListItemId) => ({
  type: ShoppingListActionsTypes.EDIT_SHOPPING_LIST_ITEM,
  payload: editListItemId
})

export const resetEditingShoppingListItem = () => ({
  type: ShoppingListActionsTypes.RESET_EDITING_SHOPPING_LIST_ITEM
})

export const removeShoppingListItem = (removeListItemId) => ({
  type: ShoppingListActionsTypes.REMOVE_SHOPPING_LIST_ITEM,
  payload: removeListItemId
})

export const updateShoppingListItem = (updatedListItemData) => ({
  type: ShoppingListActionsTypes.UPDATE_SHOPPING_LIST_ITEM,
  payload: updatedListItemData
})
