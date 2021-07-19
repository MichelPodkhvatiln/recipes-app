import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import CreateRecipePage from '../../pages/create-recipe-page/create-recipe-page.component'

import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'

const CreateRecipeRouteContainer = () => {
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  return isAuthenticatedUser ?
    <CreateRecipePage />
    :
    <Redirect to='/' />
}

export default CreateRecipeRouteContainer
