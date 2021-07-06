import { Redirect, Route, Switch } from 'react-router-dom'
import ROUTER from '../../router/router'

import { Container } from '@material-ui/core'
import Header from '../header/header.component'

const App = () => (
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

export default App
