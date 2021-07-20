import RecipesActionsTypes from './recipes.actions.types'
import FirebaseAPI from '../../api/FirebaseAPI'

export const resetRecipeCreatedStatus = () => ({
  type: RecipesActionsTypes.CHANGE_RECIPE_CREATED_STATUS,
  payload: false
})

export const resetRecipeRemovedStatus = () => ({
  type: RecipesActionsTypes.CHANGE_RECIPE_REMOVED_STATUS,
  payload: false
})

export const createRecipe = (recipeInfo) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.CREATE_RECIPE_START })

  try {
    const recipeRef = await FirebaseAPI.addRecipe(recipeInfo)
    const recipeSnapshot = await recipeRef.get()
    const recipeData = await recipeSnapshot.data()


    dispatch({
      type: RecipesActionsTypes.CREATE_RECIPE_SUCCESS,
      payload: {
        id: recipeSnapshot.id,
        ...recipeData
      }
    })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.CREATE_RECIPE_FAILURE, payload: err })
  }
}

export const getRecipeList = () => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_START })

  try {
    const { docs } = await FirebaseAPI.getRecipesList()

    if (!docs?.length) {
      dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_SUCCESS, payload: [] })
      return
    }

    const docsData = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_SUCCESS, payload: docsData })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_FAILURE })
  }
}

export const removeRecipe = (recipeId) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.REMOVE_RECIPE_START })

  try {
    await FirebaseAPI.removeRecipeById(recipeId)
    dispatch({ type: RecipesActionsTypes.REMOVE_RECIPE_SUCCESS, payload: recipeId })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.REMOVE_RECIPE_FAILURE })
  }
}
