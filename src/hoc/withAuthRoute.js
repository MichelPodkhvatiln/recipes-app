import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticatedUser } from '../redux/user/user.selectors'

const withAuthRoute = (WrappedComponent) => () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  return isAuthenticatedUser ? <WrappedComponent /> : <Redirect to='/' />
}

export default withAuthRoute
