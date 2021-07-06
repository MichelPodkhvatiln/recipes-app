import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckUserSessionProcess } from '../../redux/user/user.selectors'
import { checkUserSession } from '../../redux/user/user.actions'

import { CircularProgress, makeStyles } from '@material-ui/core'
import App from '../../components/app/app.component'

const useStyles = makeStyles(() => ({
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%'
  }
}))

const AppContainer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isCheckUserSessionProcess = useSelector(selectCheckUserSessionProcess)

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <>
      {
        isCheckUserSessionProcess ?
          <div className={classes.loader}>
            <CircularProgress />
          </div>
          :
          <App />
      }
    </>
  )
}

export default AppContainer
