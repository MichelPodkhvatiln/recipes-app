import { useEffect, useState } from 'react'
import { useUnwrapAsyncThunk } from '../../hooks/useUnwrapAsyncThunk'

import App from '../../components/layout/app/app.component'
import PageLoader from '../../components/shared/page-loader/page-loader.component'
import { checkUserSession } from '../../redux/modules/user/user.actions'
import { BrowserSyncActions } from '../../constants/browserSyncActions'


const AppContainer = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useUnwrapAsyncThunk()

  useEffect(() => {
    appCheckUserSession()

    window.addEventListener('storage', handleLocalStorage)

    return () => {
      window.removeEventListener('storage', handleLocalStorage)
    }
    // eslint-disable-next-line
  }, [])

  async function appCheckUserSession() {
    try {
      setLoading(true)
      await dispatch(checkUserSession())
      setLoading(false)
    } catch (err) {
      throw new Error(err)
    }
  }

  function handleLocalStorage({ key }) {
    if (key === BrowserSyncActions.AUTH_CHANGE) {
      setTimeout(() => {
        appCheckUserSession()
      }, 1000)
    }
  }

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
