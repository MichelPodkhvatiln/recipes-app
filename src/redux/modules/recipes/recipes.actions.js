import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import FirebaseAPI from '../../../api/FirebaseAPI'

import RecipesActionsTypes from './recipes.actions.types'
import { normalizeRecipeDocData } from './recipes.utils'

export const fetchRecipesListWithPaging = createAsyncThunk(
  RecipesActionsTypes.FETCH_RECIPE_LIST,
  async ({ limit, lastQueryDoc }) => {
    const { docs } = await FirebaseAPI.getRecipesListWithPaging(limit + 1, lastQueryDoc)

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
    const recipeSnapshot = await FirebaseAPI.getRecipe(id)

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
    const recipeRef = await FirebaseAPI.addRecipe(data)
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
  async (id, updatedData) => {
    await FirebaseAPI.updateRecipe(id, updatedData)
    const recipeSnapshot = await FirebaseAPI.getRecipe(id)
    const recipeData = normalizeRecipeDocData(recipeSnapshot)

    return {
      id: recipeSnapshot.id,
      ...recipeData
    }
  }
)

export const deleteRecipe = createAsyncThunk(RecipesActionsTypes.DELETE_RECIPE,
  async (id) => {
    await FirebaseAPI.removeRecipe(id)
  })
