import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRecipeCreatedStatus, selectRecipeRemovedStatus } from '../../../redux/recipes/recipes.selectors'

import { resetRecipeCreatedStatus, resetRecipeRemovedStatus } from '../../../redux/recipes/recipes.actions'

export function useRecipesPageRedirect() {
  const dispatch = useDispatch()
  const recipeCreatedStatus = useSelector(selectRecipeCreatedStatus)
  const recipeRemovedStatus = useSelector(selectRecipeRemovedStatus)

  useEffect(() => {
    if (!recipeCreatedStatus) return

    dispatch(resetRecipeCreatedStatus())
  }, [recipeCreatedStatus, dispatch])

  useEffect(() => {
    if (!recipeRemovedStatus) return

    dispatch(resetRecipeRemovedStatus())
  }, [recipeRemovedStatus, dispatch])
}
