import ShoppingListActionsTypes from './shopping-list.actions.types'
import { getEditingItemData, removeShoppingListItem, updateShoppingListItem } from './shopping-list.utils'

const INITIAL_STATE = {
  list: [],
  editingItem: null
}

const shoppingListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShoppingListActionsTypes.ADD_SHOPPING_LIST_ITEM:
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    case ShoppingListActionsTypes.EDIT_SHOPPING_LIST_ITEM:
      return {
        ...state,
        editingItem: getEditingItemData(state.list, action.payload)
      }
    case ShoppingListActionsTypes.RESET_EDITING_SHOPPING_LIST_ITEM:
      return {
        ...state,
        editingItem: null
      }
    case ShoppingListActionsTypes.UPDATE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        list: updateShoppingListItem(state.list, state.editingItem, action.payload)
      }
    case ShoppingListActionsTypes.REMOVE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        list: removeShoppingListItem(state.list, action.payload)
      }
    default:
      return state
  }
}

export default shoppingListReducer
