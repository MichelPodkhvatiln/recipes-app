import RecipesActionsTypes from './recipes.actions.types'

const INITIAL_STATE = {
  recipesList: [],
  error: null,
  isCreateRecipeProcess: false,
  isRecipeCreatedSuccessful: false
}

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipesActionsTypes.CREATE_RECIPE_START:
      return {
        ...state,
        error: null,
        isCreateRecipeProcess: true,
        isRecipeCreatedSuccessful: false
      }
    case RecipesActionsTypes.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipesList: [...state.recipesList, action.payload],
        error: null,
        isCreateRecipeProcess: false,
        isRecipeCreatedSuccessful: true
      }
    case RecipesActionsTypes.CREATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isCreateRecipeProcess: false
      }
    case RecipesActionsTypes.CHANGE_RECIPE_CREATED_STATUS:
      return {
        ...state,
        isRecipeCreatedSuccessful: !!action.payload
      }
    default:
      return state
  }
}

export default recipeReducer
