import { createSlice } from '@reduxjs/toolkit'
import {
  createRecipe,
  deleteRecipe,
  fetchRecipesListWithPaging,
  getRecipe,
  resetRecipesList,
  updateRecipe
} from './recipes.actions'

const INITIAL_STATE = {
  recipesList: [],
  currentRecipe: null
}

const slice = createSlice({
  name: 'recipes',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchRecipesListWithPaging.fulfilled, (state, action) => {
      const { docsData } = action.payload
      state.recipesList = [...state.recipesList, ...docsData]
    })

    builder.addCase(resetRecipesList, (state) => {
      state.recipesList = []
    })

    builder.addCase(getRecipe.fulfilled, (state, action) => {
      state.currentRecipe = action.payload
    })

    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.currentRecipe = action.payload
    })

    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.currentRecipe = action.payload
    })

    builder.addCase(deleteRecipe.fulfilled, (state) => {
      state.currentRecipe = null
    })
  }
})

export default slice.reducer
