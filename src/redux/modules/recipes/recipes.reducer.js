import { createSlice } from '@reduxjs/toolkit'
import { fetchRecipesListWithPaging, resetRecipesList } from './recipes.actions'

const INITIAL_STATE = {
  recipesList: []
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
  }
})

export default slice.reducer
