import { generatePath, Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentRecipe } from '../redux/recipes/recipes.selectors'
import { selectCurrentUserId } from '../redux/user/user.selectors'
import { ROUTES } from '../constants/routes'

const withRecipeAuthorRoute = (WrappedComponent) => () => {
  const { id } = useParams()
  const recipeDetails = useSelector(selectCurrentRecipe)
  const currentUserId = useSelector(selectCurrentUserId)

  if (recipeDetails) {
    const isRecipeAuthor = currentUserId === recipeDetails?.author
    return isRecipeAuthor ? <WrappedComponent /> : <Redirect to='/' />
  }

  return <Redirect to={generatePath(ROUTES.DETAIL_RECIPE_PAGE, { id })} />
}

export default withRecipeAuthorRoute
