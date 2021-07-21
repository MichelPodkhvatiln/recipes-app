import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import App from '../../components/app/app.component'
import PageLoader from '../../components/page-loader/page-loader.component'

import { selectCheckUserSessionProcess } from '../../redux/user/user.selectors'
import { checkUserSession } from '../../redux/user/user.actions'

const AppContainer = () => {
  const dispatch = useDispatch()
  const isCheckUserSessionProcess = useSelector(selectCheckUserSessionProcess)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <>
      {
        isCheckUserSessionProcess ?
          <PageLoader />
          :
          <App />
      }
    </>
  )
}

export default AppContainer
