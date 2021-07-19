import { createSelector } from 'reselect'

const selectRecipes = (state) => state.recipes

export const selectCreateRecipeProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isCreateRecipeProcess
)

export const selectRecipeCreatedSuccessful = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeCreatedStatus
)

export const selectRecipesList = createSelector(
  [selectRecipes],
  (recipes) => recipes.recipesList
)
