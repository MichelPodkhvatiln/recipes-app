import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const selectRecipes = (state) => state.recipes

export const selectActionRecipeProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isActionRecipeProcess
)

export const selectFetchingRecipesListProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isFetchingRecipesListProcess
)

export const selectFetchingRecipesListError = createSelector(
  [selectRecipes],
  (recipes) => recipes.error
)

export const selectLastRecipeDoc = createSelector(
  [selectRecipes],
  (recipes) => recipes.lastRecipeDoc
)

export const selectHasNextRecipePage = createSelector(
  [selectRecipes],
  (recipes) => recipes.hasNextRecipePage
)

export const selectRecipesList = createSelector(
  [selectRecipes],
  (recipes) => recipes.recipesList
)

export const selectRecipeItemById = memoize((recipeItemId) =>
  createSelector(
    [selectRecipesList],
    (recipesList) => recipesList.find((recipeItem) => recipeItem.id === recipeItemId)
  ))

export const selectRecipeCreatedStatus = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeCreatedStatus
)

export const selectRecipeRemovedStatus = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeRemovedStatus
)

export const selectRecipeUpdatedStatus = createSelector(
  [selectRecipes],
  (recipes) => recipes.isRecipeUpdatedStatus
)
