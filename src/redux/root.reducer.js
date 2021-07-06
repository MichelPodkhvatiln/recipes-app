import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import shoppingListReducer from './shopping-list/shopping-list.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  shoppingList: shoppingListReducer
})

export default rootReducer
