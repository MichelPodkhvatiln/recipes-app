import { ROUTES } from '../constants/routes'
import RecipesPage from '../pages/recipes-page/recipes-page.component'
import LoginRouteContainer from './containers/login-route.container'
import RegistrationRouteContainer from './containers/registration-route.container'
import ShoppingListPage from '../pages/shopping-list-page/shopping-list-page.component'


const ROUTER = [
  {
    path: ROUTES.RECIPES_PAGE,
    exact: true,
    component: RecipesPage
  },
  {
    path: ROUTES.LOGIN_PAGE,
    exact: true,
    component: LoginRouteContainer
  },
  {
    path: ROUTES.REGISTRATION_PAGE,
    exact: true,
    component: RegistrationRouteContainer
  },
  {
    path: ROUTES.SHOPPING_LIST_PAGE,
    exact: true,
    component: ShoppingListPage
  }
]

export default ROUTER
