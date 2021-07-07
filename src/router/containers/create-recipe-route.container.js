//import { useSelector } from 'react-redux'
//import { Redirect } from 'react-router-dom'
//import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import CreateRecipePage from '../../pages/create-recipe-page/create-recipe-page.component'

const CreateRecipeRouteContainer = () => {
  //TODO remove after develop
  //const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)
  //
  // return isAuthenticatedUser ?
  //   <CreateRecipePage />
  //   :
  //   <Redirect to='/' />

  return <CreateRecipePage />
}

export default CreateRecipeRouteContainer
