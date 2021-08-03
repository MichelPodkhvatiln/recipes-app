import { FC } from 'react'
import { APP_ROUTES } from '../../../constants/routes'

import { AppBar, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'
import { HeaderNavList } from '../header-nav-list/header-nav-list.component'
import { HeaderDrawerList } from '../header-drawer-list/header-drawer-list.component'
import { HeaderLogoNavigation } from '../header-logo-navigation/header-logo-navigation.component'

export interface IHeaderRouteLink {
  key: string,
  text: string,
  path: string
}

const routeLinks: IHeaderRouteLink[] = [
  {
    key: 'recipes',
    text: 'Recipes',
    path: APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE()
  },
  {
    key: 'shoppingList',
    text: 'Shopping List',
    path: APP_ROUTES.SHOPPING_LIST_ROUTES.SHOPPING_LIST_PAGE()
  },
  {
    key: 'login',
    text: 'Authenticate',
    path: APP_ROUTES.AUTH_ROUTES.LOGIN_PAGE()
  }
]

export const Header: FC = () => {
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
