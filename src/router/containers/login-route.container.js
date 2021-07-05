import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import LoginPage from '../../pages/login-page/login-page.component'

const LoginRouteContainer = () => {
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  return !isAuthenticatedUser ?
    <LoginPage />
    :
    <Redirect to='/' />
}

export default LoginRouteContainer
