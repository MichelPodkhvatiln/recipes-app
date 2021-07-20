import { Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRecipeItemById } from '../redux/recipes/recipes.selectors'
import { selectCurrentUserId } from '../redux/user/user.selectors'

const withRecipeAuthorRoute = (WrappedComponent) => () => {
  const { id } = useParams()
  const recipeDetails = useSelector(selectRecipeItemById(id))
  const currentUserId = useSelector(selectCurrentUserId)

  const isRecipeAuthor = currentUserId === recipeDetails?.author

  return isRecipeAuthor ? <WrappedComponent /> : <Redirect to='/' />
}

export default withRecipeAuthorRoute
