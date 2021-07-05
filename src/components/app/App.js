import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ROUTER from '../../router/router'
import { useDispatch, useSelector } from 'react-redux'

import { CircularProgress, Container } from '@material-ui/core'
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
      {
        isCheckUserSessionProcess ?
          <CircularProgress />
          :
          (
            <>
              <Header />
              <Container component='main'>
                <Switch>
                  {
                    ROUTER.map((routeData, idx) =>
                      <Route key={idx} exact={routeData.exact} path={routeData.path} component={routeData.component} />)
                  }

                  <Redirect to='/' />
                </Switch>
              </Container>
            </>
          )
      }
    </>
  )
}

export default App
