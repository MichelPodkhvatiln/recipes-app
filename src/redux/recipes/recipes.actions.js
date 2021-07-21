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

export const resetRecipeUpdatedStatus = () => ({
  type: RecipesActionsTypes.CHANGE_RECIPE_UPDATED_STATUS,
  payload: false
})

export const resetRecipePagePaginationData = () => ({
  type: RecipesActionsTypes.RESET_RECIPE_PAGE_PAGINATION_DATA
})

export const getRecipeListWithPaging = (limit, lastDoc) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_START })

  try {
    const { docs } = await FirebaseAPI.getRecipesListWithPaging(limit + 1, lastDoc)

    const hasNextPage = docs.length >= limit
    const lastQueryDoc = docs[docs.length - 1]
    const docsData = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    dispatch({ type: RecipesActionsTypes.SET_HAS_NEXT_RECIPE_PAGE_VALUE, payload: hasNextPage })
    dispatch({ type: RecipesActionsTypes.SET_LAST_RECIPE_DOC_VALUE, payload: lastQueryDoc })
    dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_SUCCESS, payload: docsData })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.FETCH_RECIPE_LIST_FAILURE, payload: err })
  }
}

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

export const removeRecipe = (recipeId) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.REMOVE_RECIPE_START })

  try {
    await FirebaseAPI.removeRecipe(recipeId)

    dispatch({ type: RecipesActionsTypes.REMOVE_RECIPE_SUCCESS, payload: recipeId })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.REMOVE_RECIPE_FAILURE })
  }
}

export const updateRecipe = (recipeId, updatedRecipeData) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.UPDATE_RECIPE_START })

  try {
    await FirebaseAPI.updateRecipe(recipeId, updatedRecipeData)
    const recipeSnapshot = await FirebaseAPI.getRecipe(recipeId)
    const recipeData = recipeSnapshot.data()

    dispatch({
      type: RecipesActionsTypes.UPDATE_RECIPE_SUCCESS,
      payload: {
        id: recipeSnapshot.id,
        ...recipeData
      }
    })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.UPDATE_RECIPE_FAILURE })
  }
}

export const getRecipe = (recipeId) => async (dispatch) => {
  dispatch({ type: RecipesActionsTypes.GET_RECIPE_START })

  try {
    const recipeSnapshot = await FirebaseAPI.getRecipe(recipeId)

    if (!recipeSnapshot.exists) {
      dispatch({ type: RecipesActionsTypes.GET_RECIPE_SUCCESS, payload: null })
    }

    const recipeData = recipeSnapshot.data()

    dispatch({
      type: RecipesActionsTypes.GET_RECIPE_SUCCESS,
      payload: {
        id: recipeSnapshot.id,
        ...recipeData
      }
    })
  } catch (err) {
    dispatch({ type: RecipesActionsTypes.GET_RECIPE_FAILURE, payload: err })
  }
}
