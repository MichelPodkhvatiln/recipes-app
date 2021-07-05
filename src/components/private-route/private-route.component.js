import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ path, component, exact, condition = true }) => {
  return condition ?
    <Route exact={exact} path={path} component={component} />
    :
    <Redirect to='/' />
}

export default PrivateRoute
