import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import CreateRecipePage from '../../pages/create-recipe-page/create-recipe-page.component'

const CreateRecipeRouteContainer = () => {
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  return isAuthenticatedUser ?
    <CreateRecipePage />
    :
    <Redirect to='/' />
}

export default CreateRecipeRouteContainer
