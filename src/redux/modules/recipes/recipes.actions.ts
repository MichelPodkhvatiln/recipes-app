import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { services } from '../../../services'
import { normalizeRecipeDocData } from './recipes.utils'
import type {
  FirebaseDocumentData,
  FirebaseQueryDocumentSnapshot,
  IRecipeData,
  IRecipeEditFormData
} from '../../../interfaces'
import { IFetchRecipesListWithPaging } from '../../../interfaces'
import { RecipesActionsTypes } from './recipes.actions.types'

export const fetchRecipesListWithPaging = createAsyncThunk<IFetchRecipesListWithPaging, {
  limit: number,
  lastQueryDoc: FirebaseQueryDocumentSnapshot<FirebaseDocumentData> | null
}>(
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

export const resetRecipesList = createAction<undefined>(RecipesActionsTypes.RESET_RECIPE_LIST)

export const getRecipe = createAsyncThunk<IRecipeData | null, string>(
  RecipesActionsTypes.GET_RECIPE,
  async (id) => {
    const recipeSnapshot = await services.recipes.getRecipe(id)

    if (!recipeSnapshot.exists) return null

    return normalizeRecipeDocData(recipeSnapshot)
  })

export const createRecipe = createAsyncThunk<IRecipeData, IRecipeEditFormData>(
  RecipesActionsTypes.CREATE_RECIPE,
  async (data) => {
    const recipeRef = await services.recipes.addRecipe(data)
    const recipeSnapshot = await recipeRef.get()
    return normalizeRecipeDocData(recipeSnapshot)
  }
)

export const updateRecipe = createAsyncThunk<IRecipeData, {
  id: string,
  updatedData: IRecipeEditFormData
}>(
  RecipesActionsTypes.UPDATE_RECIPE,
  async ({ id, updatedData }) => {
    await services.recipes.updateRecipe(id, updatedData)
    const recipeSnapshot = await services.recipes.getRecipe(id)

    return normalizeRecipeDocData(recipeSnapshot)
  }
)

export const deleteRecipe = createAsyncThunk<Promise<void>, string>(RecipesActionsTypes.DELETE_RECIPE,
  async (id) => {
    await services.recipes.removeRecipe(id)
  })
