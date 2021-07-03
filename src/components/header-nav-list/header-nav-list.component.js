import PropTypes from 'prop-types'
import { Link, makeStyles } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  link: {
    margin: '0 7px',
    fontSize: theme.typography.htmlFontSize
  }
}))

const HeaderNavList = ({ routeLinks }) => {
  const classes = useStyles()

  return (
    <>
      {
        routeLinks.map((linkData) => (
          <Link
            key={linkData.path}
            className={classes.link}
            color='inherit'
            component={RouterLink}
            to={linkData.path}
          >
            {linkData.text}
          </Link>
        ))
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
