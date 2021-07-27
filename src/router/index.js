import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import withAuthRoute from './hoc/withAuthRoute'

import PageLoader from '../components/shared/page-loader/page-loader.component'
import withRecipeAuthorRoute from './hoc/withRecipeAuthorRoute'

const RecipesPage = lazy(() => import('../pages/recipes-page/recipes-page.component'))
const ShoppingListPage = lazy(() => import('../pages/shopping-list-page/shopping-list-page.component'))
const DetailRecipePage = lazy(() => import('../pages/detail-recipe-page/detail-recipe-page.component'))
const EditRecipePage = lazy(() => import('../pages/edit-recipe-page/edit-recipe-page.component'))
const LoginPage = lazy(() => import('../pages/login-page/login-page.component'))
const RegistrationPage = lazy(() => import('../pages/registration-page/registration-page.component'))
const CreateRecipePage = lazy(() => import('../pages/create-recipe-page/create-recipe-page.component'))

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route exact={true} path={ROUTES.AUTH_ROUTES.LOGIN_PAGE} component={withAuthRoute(LoginPage)} />
        <Route exact={true} path={ROUTES.AUTH_ROUTES.REGISTRATION_PAGE} component={withAuthRoute(RegistrationPage)} />

        <Route exact={true} path={ROUTES.RECIPES_ROUTES.RECIPES_PAGE} component={RecipesPage} />
        <Route exact={true} path={ROUTES.RECIPES_ROUTES.CREATE_RECIPE_PAGE} component={withAuthRoute(CreateRecipePage)} />
        <Route exact={true} path={ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE} component={DetailRecipePage} />
        <Route exact={true} path={ROUTES.RECIPES_ROUTES.EDIT_RECIPE_PAGE} component={withRecipeAuthorRoute(EditRecipePage)} />

        <Route exact={true} path={ROUTES.SHOPPING_LIST_ROUTES.SHOPPING_LIST_PAGE} component={ShoppingListPage} />

        <Redirect to='/' />
      </Switch>
    </Suspense>
  )
}

export default AppRouter
