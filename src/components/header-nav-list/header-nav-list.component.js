import PropTypes from 'prop-types'
import { Link, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/user.selectors'

const useStyles = makeStyles((theme) => ({
  link: {
    margin: '0 7px',
    fontSize: theme.typography.htmlFontSize
  }
}))

const HeaderNavList = ({ routeLinks }) => {
  const classes = useStyles()
  const currentUser = useSelector(selectCurrentUser)

  return (
    <>
      {
        routeLinks.map((linkData) => {
          if ('hide' in linkData && linkData.hide) return null

          return (
            <Link
              key={linkData.path}
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
      {
        !!currentUser ?
          <Link
            className={classes.link}
            color='inherit'
            component='button'
          >
            Log Out
          </Link>
          : null
      }
    </>
  )
}

HeaderNavList.propTypes = {
  routeLinks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    path: PropTypes.string
  })).isRequired
}

export default HeaderNavList
