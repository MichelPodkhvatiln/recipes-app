import { FC } from 'react'
import { Link, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUnwrapAsyncThunk } from '../../../hooks'

import { IHeaderRouteLink } from '../header/header.component'

import { selectIsAuthenticatedUser } from '../../../redux/modules/user/user.selectors'
import { signOut } from '../../../redux/modules/user/user.actions'

const useStyles = makeStyles((theme) => ({
  link: {
    margin: '0 7px',
    fontSize: theme.typography.body1.fontSize
  }
}))

export const HeaderNavList: FC<{ routeLinks: IHeaderRouteLink[] }> = ({ routeLinks }) => {
  const classes = useStyles()
  const dispatch = useUnwrapAsyncThunk()
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  async function onLogOutClick(): Promise<void> {
    try {
      await dispatch(signOut())
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {
        routeLinks.map((linkData) => {
          if (linkData.key === 'login') {
            return (
              isAuthenticatedUser ?
                <Link
                  key={linkData.key}
                  className={classes.link}
                  color='inherit'
                  component='button'
                  onClick={onLogOutClick}
                >
                  Log Out
                </Link>
                :
                <Link
                  key={linkData.key}
                  className={classes.link}
                  color='inherit'
                  component={RouterLink}
                  to={linkData.path}
                >
                  {linkData.text}
                </Link>
            )
          }

          return (
            <Link
              key={linkData.key}
              className={classes.link}
              color='inherit'
              component={RouterLink}
              to={linkData.path}
            >
              {linkData.text}
            </Link>
          )
        })
      }
    </>
  )
}
