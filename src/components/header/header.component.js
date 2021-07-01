import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Link, makeStyles, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => {
  return {
    title: {
      flexGrow: 1,
      fontSize: theme.typography.h6.fontSize
    }
    ,
    link: {
      margin: '0 7px',
      fontSize: theme.typography.htmlFontSize
    }
  }
})

const routesLink = [
  {
    text: 'Recipes',
    path: '/'
  },
  {
    text: 'Shopping List',
    path: '/shopping-list'
  },
  {
    text: 'Authenticate',
    path: '/login'
  }
]

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar color={'inherit'} position={'sticky'}>
      <Toolbar>
        <Link
          className={classes.title}
          color='inherit'
          component={RouterLink}
          to='/'
        >
          MyRecipes
        </Link>

        {
          routesLink.map((linkData) => (
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
      </Toolbar>
    </AppBar>
  )
}

export default Header
