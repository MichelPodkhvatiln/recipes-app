import { Link as RouterLink, useRouteMatch } from 'react-router-dom'
import { AppBar, IconButton, Link, makeStyles, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import HeaderNavList from '../header-nav-list/header-nav-list.component'
import HeaderDrawerList from '../header-drawer-list/header-drawer-list.component'
import { ROUTES } from '../../constants/routes'

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: 'auto',
    fontSize: theme.typography.h6.fontSize
  },
  toHomePage: {
    marginRight: 'auto',
    fontSize: theme.typography.h6.fontSize
  }
}))

const routeLinks = [
  {
    key: 'recipes',
    text: 'Recipes',
    path: ROUTES.RECIPES_PAGE
  },
  {
    key: 'shoppingList',
    text: 'Shopping List',
    path: ROUTES.SHOPPING_LIST_PAGE
  },
  {
    key: 'login',
    text: 'Authenticate',
    path: ROUTES.LOGIN_PAGE
  }
]

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isTouchMatch = useMediaQuery(theme.breakpoints.up('md'))
  const isCreateRecipePage = !!useRouteMatch(ROUTES.CREATE_RECIPE_PAGE)

  return (
    <AppBar color='inherit' position='sticky'>
      <Toolbar>
        <Link
          className={classes.toHomePage}
          color='inherit'
          component={RouterLink}
          to='/'
        >
          {
            isCreateRecipePage ? (
              <IconButton aria-label='back'>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              'MyRecipes'
            )
          }
        </Link>

        {
          isTouchMatch ?
            <HeaderNavList routeLinks={routeLinks} />
            :
            <HeaderDrawerList routeLinks={routeLinks} />
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header
