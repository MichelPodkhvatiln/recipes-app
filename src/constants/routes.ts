export const APP_ROUTES = {
  AUTH_ROUTES: {
    LOGIN_PAGE: () => '/login',
    REGISTRATION_PAGE: () => '/registration'
  },
  RECIPES_ROUTES: {
    RECIPES_PAGE: () => '/',
    CREATE_RECIPE_PAGE: () => '/create-recipe',
    DETAIL_RECIPE_PAGE: (recipeId?: string) =>
      recipeId ? `/recipe/${recipeId}` : '/recipe/:id',
    EDIT_RECIPE_PAGE: (recipeId?: string) =>
      recipeId ? `/edit-recipe/${recipeId}` : '/edit-recipe/:id'
  },
  SHOPPING_LIST_ROUTES: {
    SHOPPING_LIST_PAGE: () => '/shopping-list'
  }
}
