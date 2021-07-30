import { createAction } from '@reduxjs/toolkit'
import { ShoppingListActionsTypes } from './shopping-list.actions.types'
import { IShoppingListFormData, IShoppingListItem } from '../../../interfaces'

export const addShoppingListItem = createAction<IShoppingListItem>(ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM)
export const updateShoppingListItem = createAction<IShoppingListFormData>(ShoppingListActionsTypes.UPDATE_SHOPPING_LIST_ITEM)
export const removeShoppingListItem = createAction<string>(ShoppingListActionsTypes.REMOVE_SHOPPING_LIST_ITEM)

export const startEditShoppingListItem = createAction<string>(ShoppingListActionsTypes.START_EDIT_SHOPPING_LIST_ITEM)
export const resetEditingShoppingListItem = createAction<undefined>(ShoppingListActionsTypes.RESET_EDITING_SHOPPING_LIST_ITEM)



