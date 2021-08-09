import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import user from './modules/user/user.reducer'
import recipes from './modules/recipes/recipes.reducer'
import shoppingList from './modules/shopping-list/shopping-list.reducer'

export const rootReducer = combineReducers({
  user,
  recipes,
  shoppingList
})

const persistConfig = {
  key: 'root',
  version: 2,
  storage,
  whitelist: ['shoppingList']
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
