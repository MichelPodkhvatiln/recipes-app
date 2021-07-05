import { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer, IconButton, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import { userLogOut } from '../../redux/user/user.actions'

const drawerWidth = 240
const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
    dispatch(userLogOut())
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
