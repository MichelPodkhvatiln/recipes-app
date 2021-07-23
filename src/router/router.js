import { lazy } from 'react'
import { ROUTES } from '../constants/routes'

import withAuthRoute from '../hoc/withAuthRoute'

const RecipesPage = lazy(() => import('../pages/recipes-page/recipes-page.component'))
const ShoppingListPage = lazy(() => import('../pages/shopping-list-page/shopping-list-page.component'))
const DetailRecipePage = lazy(() => import('../pages/detail-recipe-page/detail-recipe-page.component'))
const EditRecipePage = lazy(() => import('../pages/edit-recipe-page/edit-recipe-page.component'))
const LoginPage = lazy(() => import('../pages/login-page/login-page.component'))
const RegistrationPage = lazy(() => import('../pages/registration-page/registration-page.component'))
const CreateRecipePage = lazy(() => import('../pages/create-recipe-page/create-recipe-page.component'))

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
  }
  // {
  //   path: ROUTES.EDIT_RECIPE_PAGE,
  //   exact: true,
  //   component: withRecipeAuthorRoute(EditRecipePage)
  // }
]

export default ROUTER
