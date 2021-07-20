export function removeRecipe(recipesList = [], recipeId) {
  return recipesList.filter((recipeListItem) => recipeListItem.id !== recipeId)
}

export function updateRecipe(recipesList = [], updatedRecipeData = {}) {
  const idx = recipesList.findIndex((recipeListItem) => recipeListItem.id === updatedRecipeData.id)

  if (idx < 0) return

  const recipesListCopy = [...recipesList]

  recipesListCopy.splice(idx, 1, updatedRecipeData)

  return recipesListCopy
}
