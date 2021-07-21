import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

const selectRecipes = (state) => state.recipes

export const selectActionRecipeProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isActionRecipeProcess
)

export const selectFetchingRecipeListProcess = createSelector(
  [selectRecipes],
  (recipes) => recipes.isFetchingRecipeListProcess
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


// export const selectCreateRecipeProcess = createSelector(
//   [selectRecipes],
//   (recipes) => recipes.isCreateRecipeProcess
// )
//
// export const selectRemoveRecipeProcess = createSelector(
//   [selectRecipes],
//   (recipes) => recipes.isRemoveRecipeProcess
// )
//
// export const selectUpdateRecipeProcess = createSelector(
//   [selectRecipes],
//   (recipes) => recipes.isUpdateRecipeProcess
// )
