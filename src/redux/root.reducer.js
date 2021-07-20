import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import shoppingListReducer from './shopping-list/shopping-list.reducer'
import recipeReducer from './recipes/recipes.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['shoppingList']
}

const rootReducer = combineReducers({
  user: userReducer,
  shoppingList: shoppingListReducer,
  recipes: recipeReducer
})

export default persistReducer(persistConfig, rootReducer)
