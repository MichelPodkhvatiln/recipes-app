import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../interfaces'

const selectRecipes = (state: RootState) => state.recipes

export const selectRecipesList = createSelector(
  [selectRecipes],
  (recipes) => recipes.recipesList
)

export const selectCurrentRecipe = createSelector(
  [selectRecipes],
  (recipes) => recipes.currentRecipe
)
