import RecipesActionsTypes from './recipes.actions.types'

const INITIAL_STATE = {
  error: null,

  recipesList: [],
  lastRecipeDoc: null,
  hasNextRecipePage: false,

  currentRecipe: null,

  isFetchingRecipesListProcess: false,
  isFetchingRecipeProcess: false,
  isActionRecipeProcess: false,

  isRecipeCreatedStatus: false,
  isRecipeRemovedStatus: false,
  isRecipeUpdatedStatus: false
}

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RecipesActionsTypes.CHANGE_RECIPE_CREATED_STATUS:
      return {
        ...state,
        isRecipeUpdatedStatus: !!action.payload
      }
    case RecipesActionsTypes.CHANGE_RECIPE_REMOVED_STATUS:
      return {
        ...state,
        isRecipeRemovedStatus: !!action.payload
      }
    case RecipesActionsTypes.CHANGE_RECIPE_UPDATED_STATUS:
      return {
        ...state,
        isRecipeUpdatedStatus: !!action.payload
      }
    case RecipesActionsTypes.SET_CURRENT_RECIPE_VALUE:
      return {
        ...state,
        currentRecipe: action.payload
      }
    case RecipesActionsTypes.SET_LAST_RECIPE_DOC_VALUE:
      return {
        ...state,
        lastRecipeDoc: action.payload
      }
    case RecipesActionsTypes.SET_HAS_NEXT_RECIPE_PAGE_VALUE:
      return {
        ...state,
        hasNextRecipePage: action.payload
      }
    case RecipesActionsTypes.RESET_RECIPE_PAGE_PAGINATION_DATA:
      return {
        ...state,
        recipesList: [],
        lastRecipeDoc: null,
        hasNextRecipePage: false
      }
    case RecipesActionsTypes.RESET_CURRENT_RECIPE_VALUE:
      return {
        ...state,
        currentRecipe: null
      }
    case RecipesActionsTypes.FETCH_RECIPE_LIST_START:
      return {
        ...state,
        error: null,
        isFetchingRecipesListProcess: true
      }
    case RecipesActionsTypes.FETCH_RECIPE_LIST_SUCCESS:
      return {
        ...state,
        recipesList: [...state.recipesList, ...action.payload],
        isFetchingRecipesListProcess: false
      }
    case RecipesActionsTypes.FETCH_RECIPE_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetchingRecipesListProcess: false
      }
    case RecipesActionsTypes.CREATE_RECIPE_START:
      return {
        ...state,
        error: null,
        isActionRecipeProcess: true,
        isRecipeCreatedStatus: false
      }
    case RecipesActionsTypes.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        error: null,
        isActionRecipeProcess: false,
        isRecipeCreatedStatus: true
      }
    case RecipesActionsTypes.CREATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isActionRecipeProcess: false
      }
    case RecipesActionsTypes.REMOVE_RECIPE_START:
      return {
        ...state,
        error: null,
        isActionRecipeProcess: true,
        isRecipeRemovedStatus: false
      }
    case RecipesActionsTypes.REMOVE_RECIPE_SUCCESS:
      return {
        ...state,
        isActionRecipeProcess: false,
        isRecipeRemovedStatus: true
      }
    case RecipesActionsTypes.REMOVE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isActionRecipeProcess: false
      }
    case RecipesActionsTypes.UPDATE_RECIPE_START:
      return {
        ...state,
        error: null,
        isActionRecipeProcess: true,
        isRecipeUpdatedStatus: false
      }
    case RecipesActionsTypes.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        currentRecipe: action.payload,
        isActionRecipeProcess: false,
        isRecipeUpdatedStatus: true
      }
    case RecipesActionsTypes.UPDATE_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isActionRecipeProcess: false
      }
    case RecipesActionsTypes.GET_RECIPE_START:
      return {
        ...state,
        error: null,
        isFetchingRecipeProcess: true
      }
    case RecipesActionsTypes.GET_RECIPE_SUCCESS:
      return {
        ...state,
        currentRecipe: action.payload,
        isFetchingRecipeProcess: false
      }
    case RecipesActionsTypes.GET_RECIPE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetchingRecipeProcess: false
      }
    default:
      return state
  }
}

export default recipeReducer
