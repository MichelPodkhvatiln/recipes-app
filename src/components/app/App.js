import { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CircularProgress, Container, CssBaseline } from '@material-ui/core'
import routes from '../../router'

import Header from '../header/header.component'
import { checkUserSession } from '../../redux/user/user.actions'
import { selectCheckUserSessionProcess } from '../../redux/user/user.selectors'

const App = () => {
  const dispatch = useDispatch()
  const isCheckUserSessionProcess = useSelector(selectCheckUserSessionProcess)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <>
      <CssBaseline />

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
                    {
                      routes.map((route) => (
                        <Route key={route.path} {...route} />
                      ))
                    }
                    <Redirect to={'/'} />
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
