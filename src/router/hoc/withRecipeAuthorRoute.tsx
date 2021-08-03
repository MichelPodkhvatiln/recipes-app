import { FC } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { APP_ROUTES } from '../../constants/routes'

import { selectCurrentRecipe } from '../../redux/modules/recipes/recipes.selectors'
import { selectCurrentUserId } from '../../redux/modules/user/user.selectors'

const withRecipeAuthorRoute = (WrappedComponent: FC) => () => {
  const { id } = useParams<{ id?: string }>()
  const recipeDetails = useSelector(selectCurrentRecipe)
  const currentUserId = useSelector(selectCurrentUserId)

  if (recipeDetails) {
    const isRecipeAuthor = currentUserId === recipeDetails?.author
    return isRecipeAuthor
      ? <WrappedComponent />
      : <Redirect to={APP_ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE(id)} />
  }

  return <Redirect to={APP_ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE(id)} />
}

export default withRecipeAuthorRoute
