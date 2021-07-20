import { Redirect, Route, Switch } from 'react-router-dom'
import ROUTER from './router'

const AppRouter = () => {
  return (
    <Switch>
      {
        ROUTER.map((routeData, idx) =>
          <Route key={idx} exact={routeData.exact} path={routeData.path} component={routeData.component} />)
      }

      <Redirect to='/' />
    </Switch>
  )
}

export default AppRouter
