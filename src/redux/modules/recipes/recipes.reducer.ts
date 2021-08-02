import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  createRecipe,
  deleteRecipe,
  fetchRecipesListWithPaging,
  getRecipe,
  resetRecipesList,
  updateRecipe
} from './recipes.actions'
import { IRecipeState } from '../../../interfaces'

const initialState: IRecipeState = {
  recipesList: [],
  currentRecipe: null
}

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipesListWithPaging.fulfilled, (state, action) => {
      const { docsData } = action.payload
      state.recipesList = [...state.recipesList, ...docsData]
    })

    builder.addCase(resetRecipesList, (state) => {
      state.recipesList = []
    })

    builder.addCase(deleteRecipe.fulfilled, (state) => {
      state.currentRecipe = null
    })

    builder.addMatcher(isAnyOf(
      getRecipe.fulfilled,
      createRecipe.fulfilled,
      updateRecipe.fulfilled
    ), (state, action) => {
      state.currentRecipe = action.payload
    })
  }
})

export default slice.reducer
