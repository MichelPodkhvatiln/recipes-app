import { ROUTES } from '../constants/routes'
import RecipesPage from '../pages/recipes-page/recipes-page.component'
import LoginRouteContainer from './containers/login-route.container'
import RegistrationRouteContainer from './containers/registration-route.container'


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
  }
]

export default ROUTER
