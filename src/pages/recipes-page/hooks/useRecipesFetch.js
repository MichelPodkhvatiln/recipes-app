import { useSelector } from 'react-redux'
import {
  selectFetchingRecipesListProcess,
  selectFetchingRecipesListError,
  selectHasNextRecipePage,
  selectLastRecipeDoc,
  selectRecipesList
} from '../../../redux/recipes/recipes.selectors'
import { useEffect } from 'react'

export function useRecipesFetch() {
  const recipesList = useSelector(selectRecipesList)
  const lastRecipeDoc = useSelector(selectLastRecipeDoc)
  const loading = useSelector(selectFetchingRecipesListProcess)
  const hasNextPage = useSelector(selectHasNextRecipePage)
  const fetchingError = useSelector(selectFetchingRecipesListError)

  useEffect(() => {
    if (!fetchingError) return

    throw new Error()
  }, [fetchingError])

  return {
    recipesList,
    lastRecipeDoc,
    loading,
    hasNextPage
  }
}
