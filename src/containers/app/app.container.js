import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import App from '../../components/app/app.component'
import PageLoader from '../../components/page-loader/page-loader.component'
import { checkUserSession } from '../../redux/modules/user/user.actions'

const AppContainer = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    (async function() {
      try {
        await dispatch(checkUserSession())
        setLoading(false)
      } catch (err) {
        throw new Error(err)
      }
    })()
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
