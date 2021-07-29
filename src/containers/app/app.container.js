import { useEffect, useState } from 'react'
import { useUnwrapAsyncThunk } from '../../hooks/useUnwrapAsyncThunk'

import App from '../../components/layout/app/app.component'
import PageLoader from '../../components/shared/page-loader/page-loader.component'
import { checkUserSession } from '../../redux/modules/user/user.actions'


const AppContainer = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useUnwrapAsyncThunk()

  useEffect(() => {
    const _checkUserSession = async () => {
      try {
        await dispatch(checkUserSession())
        setLoading(false)
      } catch (err) {
        throw new Error(err)
      }
    }

    _checkUserSession()
    // eslint-disable-next-line
  }, [])

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
