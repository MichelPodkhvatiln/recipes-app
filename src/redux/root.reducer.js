import { combineReducers } from '@reduxjs/toolkit'
import user from './modules/user/user.reducer'
import recipes from './modules/recipes/recipes.reducer'
import shoppingList from './modules/shopping-list/shopping-list.reducer'

const rootReducer = combineReducers({
  user,
  recipes,
  shoppingList
})

export default rootReducer
