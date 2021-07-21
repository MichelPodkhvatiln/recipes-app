import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import App from '../../components/app/app.component'
import PageLoader from '../../components/page-loader/page-loader.component'

import { selectCheckUserSessionProcess } from '../../redux/user/user.selectors'
import { checkUserSession } from '../../redux/user/user.actions'
import { getRecipeList } from '../../redux/recipes/recipes.actions'
import { selectFetchingRecipeListProcess } from '../../redux/recipes/recipes.selectors'

const AppContainer = () => {
  const dispatch = useDispatch()
  const isCheckUserSessionProcess = useSelector(selectCheckUserSessionProcess)
  const isFetchingRecipeListProcess = useSelector(selectFetchingRecipeListProcess)

  useEffect(() => {
    dispatch(checkUserSession())
    dispatch(getRecipeList())
  }, [dispatch])

  return (
    <>
      {
        isCheckUserSessionProcess || isFetchingRecipeListProcess ?
          <PageLoader />
          :
          <App />
      }
    </>
  )
}

export default AppContainer
