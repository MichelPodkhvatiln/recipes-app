import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CircularProgress, Container, CssBaseline } from '@material-ui/core'
import routes from '../../router'

import Header from '../header/header.component'

const App = () => {
  return (
    <>
      <CssBaseline />

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

export default App
