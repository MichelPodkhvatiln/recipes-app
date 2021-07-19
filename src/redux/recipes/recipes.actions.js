import RecipesActionsTypes from './recipes.actions.types'
import FirebaseAPI from '../../api/FirebaseAPI'

export const beforeCreateRecipePageEnter = () => ({
  type: RecipesActionsTypes.CHANGE_RECIPE_CREATED_STATUS,
  payload: false
})

export const createRecipe = (recipeInfo) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.CREATE_RECIPE_START })

  try {
    const recipeRef = await FirebaseAPI.addRecipe(recipeInfo)
    const recipeSnapshot = await recipeRef.get()
    const recipeData = await recipeSnapshot.data()

    dispatch({ type: RecipesActionsTypes.CREATE_RECIPE_SUCCESS, payload: recipeData })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.CREATE_RECIPE_FAILURE, payload: err })
  }
}
