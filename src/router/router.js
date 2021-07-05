import RecipesPage from '../pages/recipes-page/recipes-page.component'
import LoginRouteContainer from './containers/login-route.container'
import RegistrationRouteContainer from './containers/registration-route.container'

const ROUTER = [
  {
    path: '/',
    exact: true,
    component: RecipesPage
  },
  {
    path: '/login',
    exact: true,
    component: LoginRouteContainer
  },
  {
    path: '/registration',
    exact: true,
    component: RegistrationRouteContainer
  }
]

export default ROUTER
