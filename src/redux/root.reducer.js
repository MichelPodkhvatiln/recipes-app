import { combineReducers } from 'redux'
import user from './modules/user/user.reducer'
import recipes from './modules/recipes/recipes.reducer'

const rootReducer = combineReducers({
  user,
  recipes
})

export default rootReducer
