import { lazy, Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CircularProgress, Container } from '@material-ui/core'
import Header from '../header/header.component'
import { checkUserSession } from '../../redux/user/user.actions'
import { selectCheckUserSessionProcess, selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import PrivateRoute from '../private-route/private-route.component'

const RecipesPage = lazy(() => import('../../pages/recipes-page/recipes-page.component'))
const LoginPage = lazy(() => import('../../pages/login-page/login-page.component'))
const RegistrationPage = lazy(() => import('../../pages/registration-page/registration-page.component'))

const App = () => {
  const dispatch = useDispatch()
  const isCheckUserSessionProcess = useSelector(selectCheckUserSessionProcess)
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <>
      {
        isCheckUserSessionProcess ?
          <CircularProgress />
          :
          (
            <>
              <Header />
              <Container component='main'>
                <Suspense fallback={<CircularProgress />}>
                  <Switch>
                    <Route exact path='/' component={RecipesPage} />
                    <PrivateRoute
                      exact
                      path='/login'
                      component={LoginPage}
                      condition={!isAuthenticatedUser} />
                    <PrivateRoute
                      exact
                      path='/registration'
                      component={RegistrationPage}
                      condition={!isAuthenticatedUser} />
                    <Redirect to='/' />
                  </Switch>
                </Suspense>
              </Container>
            </>
          )
      }
    </>
  )
}

export default App
