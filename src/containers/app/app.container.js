import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import App from '../../components/layout/app/app.component'
import PageLoader from '../../components/shared/page-loader/page-loader.component'
import { checkUserSession } from '../../redux/modules/user/user.actions'

const AppContainer = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const _checkUserSession = async () => {
      try {
        await dispatch(checkUserSession()).unwrap()
        setLoading(false)
      } catch (err) {
        throw new Error(err)
      }
    }
    
    _checkUserSession()
  }, [dispatch])

  return (
    <>
      {
        loading ?
          <PageLoader />
          :
          <App />
      }
    </>
  )
}

export default AppContainer
