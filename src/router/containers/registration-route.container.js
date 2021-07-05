import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import RegistrationPage from '../../pages/registration-page/registration-page.component'

const RegistrationRouteContainer = () => {
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  return !isAuthenticatedUser ?
    <RegistrationPage />
    :
    <Redirect to='/' />
}

export default RegistrationRouteContainer
