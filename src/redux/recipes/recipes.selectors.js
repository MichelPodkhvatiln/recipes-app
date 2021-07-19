import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

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

export const selectFetchingRecipeListProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isFetchingRecipeListProcess
)

export const selectRecipeItemById = memoize((recipeItemId) =>
  createSelector(
    [selectRecipesList],
    (recipesList) => recipesList.find((recipeItem) => recipeItem.id === recipeItemId)
  ))
