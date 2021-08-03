import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { APP_ROUTES } from '../constants/routes'
import withAuthRoute from './hoc/withAuthRoute'

import { PageLoader } from '../components/shared/page-loader/page-loader.component'
import withRecipeAuthorRoute from './hoc/withRecipeAuthorRoute'

const RecipesPage = lazy(() => import('../pages/recipes-page/recipes-page.component'))
const ShoppingListPage = lazy(() => import('../pages/shopping-list-page/shopping-list-page.component'))
const DetailRecipePage = lazy(() => import('../pages/detail-recipe-page/detail-recipe-page.component'))
const EditRecipePage = lazy(() => import('../pages/edit-recipe-page/edit-recipe-page.component'))
const LoginPage = lazy(() => import('../pages/login-page/login-page.component'))
const RegistrationPage = lazy(() => import('../pages/registration-page/registration-page.component'))
const CreateRecipePage = lazy(() => import('../pages/create-recipe-page/create-recipe-page.component'))

const routes = {
  auth: [
    {
      path: APP_ROUTES.AUTH_ROUTES.LOGIN_PAGE(),
      component: withAuthRoute(LoginPage, true)
    },
    {
      path: APP_ROUTES.AUTH_ROUTES.REGISTRATION_PAGE(),
      component: withAuthRoute(RegistrationPage, true)
    }
  ],
  recipes: [
    {
      path: APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE(),
      component: RecipesPage
    },
    {
      path: APP_ROUTES.RECIPES_ROUTES.CREATE_RECIPE_PAGE(),
      component: withAuthRoute(CreateRecipePage)
    },
    {
      path: APP_ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE(),
      component: DetailRecipePage
    },
    {
      path: APP_ROUTES.RECIPES_ROUTES.EDIT_RECIPE_PAGE(),
      component: withRecipeAuthorRoute(EditRecipePage)
    }
  ],
  shoppingList: [
    {
      path: APP_ROUTES.SHOPPING_LIST_ROUTES.SHOPPING_LIST_PAGE(),
      component: ShoppingListPage
    }
  ]
}

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {
          routes.auth.map(({ path, component }) =>
            <Route key={path} exact={true} path={path} component={component} />)
        }

        {
          routes.recipes.map(({ path, component }) =>
            <Route key={path} exact={true} path={path} component={component} />)
        }

        {
          routes.shoppingList.map(({ path, component }) =>
            <Route key={path} exact={true} path={path} component={component} />)
        }

        <Redirect to='/' />
      </Switch>
    </Suspense>
  )
}

export default AppRouter
