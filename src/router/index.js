import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ROUTER from './router'

import PageLoader from '../components/page-loader/page-loader.component'

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {
          ROUTER.map((routeData, idx) =>
            <Route key={idx} exact={routeData.exact} path={routeData.path} component={routeData.component} />)
        }

        <Redirect to='/' />
      </Switch>
    </Suspense>
  )
}

export default AppRouter
