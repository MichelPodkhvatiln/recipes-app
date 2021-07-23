import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import FirebaseAPI from '../../../api/FirebaseAPI'

import RecipesActionsTypes from './recipes.actions.types'
import { normalizeRecipeDocData } from './recipes.utils'

export const fetchRecipesListWithPaging = createAsyncThunk(
  RecipesActionsTypes.FETCH_RECIPE_LIST,
  async ({ limit, lastDoc }) => {
    const { docs } = await FirebaseAPI.getRecipesListWithPaging(limit + 1, lastDoc)

    const hasNextPage = docs.length >= limit
    const lastQueryDoc = docs[docs.length - 1]
    const docsData = docs.map((doc) => normalizeRecipeDocData(doc))

    return {
      hasNextPage,
      lastQueryDoc,
      docsData
    }
  }
)

export const resetRecipesList = createAction(RecipesActionsTypes.RESET_RECIPE_LIST)
