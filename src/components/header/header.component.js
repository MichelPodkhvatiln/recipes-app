import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Link, makeStyles, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'

import HeaderNavList from '../header-nav-list/header-nav-list.component'
import HeaderDrawerList from '../header-drawer-list/header-drawer-list.component'

const useStyles = makeStyles((theme) => {
  return {
    title: {
      marginRight: 'auto',
      fontSize: theme.typography.h6.fontSize
    }
  }
})

const routeLinks = [
  {
    key: 'recipes',
    text: 'Recipes',
    path: '/'
  },
  {
    key: 'shoppingList',
    text: 'Shopping List',
    path: '/shopping-list'
  },
  {
    key: 'login',
    text: 'Authenticate',
    path: '/login'
  }
]

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <AppBar color='inherit' position='sticky'>
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
          isMatch ?
            <HeaderNavList routeLinks={routeLinks} />
            :
            <HeaderDrawerList routeLinks={routeLinks} />
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header
