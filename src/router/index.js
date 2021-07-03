import { lazy } from 'react'

const RecipesPage = lazy(() => import('../pages/recipes-page/recipes-page.component'))
const LoginPage = lazy(() => import('../pages/login-page/login-page.component'))
const RegistrationPage = lazy(() => import('../pages/registration-page/registration-page.component'))

const routes = [
  { path: '/', component: RecipesPage, exact: true },
  { path: '/login', component: LoginPage, exact: true },
  { path: '/registration', component: RegistrationPage, exact: true }
]

export default routes
