import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { services } from '../../../services'
import RecipesActionsTypes from './recipes.actions.types'
import { normalizeRecipeDocData } from './recipes.utils'

export const fetchRecipesListWithPaging = createAsyncThunk(
  RecipesActionsTypes.FETCH_RECIPE_LIST,
  async ({ limit, lastQueryDoc }) => {
    const { docs } = await services.recipes.getRecipesListWithPaging(limit + 1, lastQueryDoc)

    const hasNextPage = docs.length >= limit
    const lastDoc = docs[docs.length - 1]
    const docsData = docs.map((doc) => normalizeRecipeDocData(doc))

    return {
      hasNextPage,
      lastQueryDoc: lastDoc,
      docsData
    }
  }
)

export const resetRecipesList = createAction(RecipesActionsTypes.RESET_RECIPE_LIST)

export const getRecipe = createAsyncThunk(
  RecipesActionsTypes.GET_RECIPE,
  async (id) => {
    const recipeSnapshot = await services.recipes.getRecipe(id)

    if (!recipeSnapshot.exists) return null

    const recipeData = normalizeRecipeDocData(recipeSnapshot)

    return {
      id: recipeSnapshot.id,
      ...recipeData
    }
  })

export const createRecipe = createAsyncThunk(
  RecipesActionsTypes.CREATE_RECIPE,
  async (data) => {
    const recipeRef = await services.recipes.addRecipe(data)
    const recipeSnapshot = await recipeRef.get()
    const recipeData = normalizeRecipeDocData(recipeSnapshot)

    return {
      id: recipeSnapshot.id,
      ...recipeData
    }
  }
)

export const updateRecipe = createAsyncThunk(
  RecipesActionsTypes.UPDATE_RECIPE,
  async ({ id, updatedData }) => {
    await services.recipes.updateRecipe(id, updatedData)
    const recipeSnapshot = await services.recipes.getRecipe(id)
    const recipeData = normalizeRecipeDocData(recipeSnapshot)

    return {
      id: recipeSnapshot.id,
      ...recipeData
    }
  }
)

export const deleteRecipe = createAsyncThunk(RecipesActionsTypes.DELETE_RECIPE,
  (id) => {
    services.recipes.removeRecipe(id)
  })
