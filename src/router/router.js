import { ROUTES } from '../constants/routes'
import withAuthRoute from '../hoc/withAuthRoute'
import withRecipeAuthorRoute from '../hoc/withRecipeAuthorRoute'

import RecipesPage from '../pages/recipes-page/recipes-page.component'
import ShoppingListPage from '../pages/shopping-list-page/shopping-list-page.component'
import DetailRecipePage from '../pages/detail-recipe-page/detail-recipe-page.component'
import EditRecipePage from '../pages/edit-recipe-page/edit-recipe-page.component'
import LoginPage from '../pages/login-page/login-page.component'
import RegistrationPage from '../pages/registration-page/registration-page.component'
import CreateRecipePage from '../pages/create-recipe-page/create-recipe-page.component'

const ROUTER = [
  {
    path: ROUTES.RECIPES_PAGE,
    exact: true,
    component: RecipesPage
  },
  {
    path: ROUTES.LOGIN_PAGE,
    exact: true,
    component: withAuthRoute(LoginPage, true)
  },
  {
    path: ROUTES.REGISTRATION_PAGE,
    exact: true,
    component: withAuthRoute(RegistrationPage, true)
  },
  {
    path: ROUTES.SHOPPING_LIST_PAGE,
    exact: true,
    component: ShoppingListPage
  },
  {
    path: ROUTES.CREATE_RECIPE_PAGE,
    exact: true,
    component: withAuthRoute(CreateRecipePage)
  },
  {
    path: ROUTES.DETAIL_RECIPE_PAGE,
    exact: true,
    component: DetailRecipePage
  },
  {
    path: ROUTES.EDIT_RECIPE_PAGE,
    exact: true,
    component: withRecipeAuthorRoute(EditRecipePage)
  }
]

export default ROUTER
