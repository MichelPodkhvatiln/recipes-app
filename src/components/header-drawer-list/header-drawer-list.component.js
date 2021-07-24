import { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Divider, Drawer, IconButton, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { selectIsAuthenticatedUser } from '../../redux/modules/user/user.selectors'
import { signOut } from '../../redux/modules/user/user.actions'


const drawerMaxWidth = 375
const useStyles = makeStyles(() => ({
  drawer: {
    width: '100%',
    maxWidth: drawerMaxWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: '100%',
    maxWidth: drawerMaxWidth
  }
}))

const HeaderDrawerList = ({ routeLinks }) => {
  const classes = useStyles()
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)
  const history = useHistory()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  function toggleOpen() {
    setOpen(prevState => !prevState)
  }

  function onLinkClick(path) {
    history.push(path)
    toggleOpen()
  }

  function onLogOutClick() {
    dispatch(signOut())
    toggleOpen()
  }

  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='end'
        onClick={toggleOpen}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='right'
        open={open}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={toggleOpen}
      >

        <ListItem button onClick={toggleOpen}>
          <ChevronRightIcon />
        </ListItem>

        <Divider />

        {
          routeLinks.map((linkData) => {
            if (linkData.key === 'login') {
              return (
                isAuthenticatedUser ?
                  <ListItem
                    button
                    key={linkData.key}
                    onClick={onLogOutClick}
                  >
                    <ListItemText primary='Log out' />
                  </ListItem>
                  :
                  <ListItem
                    button
                    key={linkData.key}
                    onClick={() => onLinkClick(linkData.path)}
                  >
                    <ListItemText primary={linkData.text} />
                  </ListItem>
              )
            }

            return (
              <ListItem
                button
                key={linkData.key}
                onClick={() => onLinkClick(linkData.path)}
              >
                <ListItemText primary={linkData.text} />
              </ListItem>
            )
          })
        }
      </Drawer>
    </>
  )
}

HeaderDrawerList.propTypes = {
  routeLinks: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    path: PropTypes.string
  })).isRequired
}

export default HeaderDrawerList
