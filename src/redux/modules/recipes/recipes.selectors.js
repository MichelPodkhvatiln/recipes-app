import { createSelector } from '@reduxjs/toolkit'

const selectRecipes = (state) => state.recipes

export const selectRecipesList = createSelector(
  [selectRecipes],
  (recipes) => recipes.recipesList
)

export const selectCurrentRecipe = createSelector(
  [selectRecipes],
  (recipes) => recipes.currentRecipe
)
