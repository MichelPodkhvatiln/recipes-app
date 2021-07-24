import { createAction } from '@reduxjs/toolkit'
import ShoppingListActionsTypes from './shopping-list.actions.types'

export const addShoppingListItem = createAction(ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM)
export const updateShoppingListItem = createAction(ShoppingListActionsTypes.UPDATE_SHOPPING_LIST_ITEM)
export const removeShoppingListItem = createAction(ShoppingListActionsTypes.REMOVE_SHOPPING_LIST_ITEM)

export const startEditShoppingListItem = createAction(ShoppingListActionsTypes.START_EDIT_SHOPPING_LIST_ITEM)
export const resetEditingShoppingListItem = createAction(ShoppingListActionsTypes.RESET_EDITING_SHOPPING_LIST_ITEM)



