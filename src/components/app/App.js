import { Redirect, Route, Switch } from 'react-router-dom'
import { Container, CssBaseline } from '@material-ui/core'
import Header from '../header/header.component'

import RecipesPage from '../../pages/recipes-page/recipes-page.component'
import LoginPage from '../../pages/login-page/login-page.component'

const App = () => {
  return (
    <>
      <CssBaseline />

      <Header />
      <Container component='main'>
        <Switch>
          <Route exact path={'/'} component={RecipesPage} />
          <Route exact path={'/login'} component={LoginPage} />
          <Redirect to={'/'} />
        </Switch>
      </Container>
    </>
  )
}

export default App
