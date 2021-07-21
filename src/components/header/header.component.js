import { ROUTES } from '../../constants/routes'

import { AppBar, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'
import HeaderNavList from '../header-nav-list/header-nav-list.component'
import HeaderDrawerList from '../header-drawer-list/header-drawer-list.component'
import HeaderLogoNavigation from './header-logo-navigation/header-logo-navigation.component'

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
  const theme = useTheme()
  const isTouchMatch = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <AppBar color='inherit' position='sticky'>
      <Toolbar>
        <HeaderLogoNavigation />

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
