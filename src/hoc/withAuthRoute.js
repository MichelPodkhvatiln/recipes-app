import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectIsAuthenticatedUser } from '../redux/modules/user/user.selectors'

const withAuthRoute = (WrappedComponent, guardFromAuthUser = false) => () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  const shouldRedirect = !guardFromAuthUser ? isAuthenticatedUser : !isAuthenticatedUser

  return shouldRedirect ? <WrappedComponent /> : <Redirect to='/' />
}

export default withAuthRoute
