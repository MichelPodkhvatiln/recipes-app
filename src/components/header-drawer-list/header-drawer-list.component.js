import { useState } from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import { Drawer, IconButton, ListItem, ListItemText, makeStyles } from '@material-ui/core'

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
  const history = useHistory();
  const [open, setOpen] = useState(false)

  function toggleOpen() {
    setOpen(prevState => !prevState)
  }

  function onLinkClick(path) {
    history.push(path);
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
          routeLinks.map((linkData) => (
            <ListItem
              button
              key={linkData.path}
              onClick={() => onLinkClick(linkData.path)}
            >
              <ListItemText primary={linkData.text} />
            </ListItem>
          ))
        }
      </Drawer>
    </>
  )
}

HeaderDrawerList.propTypes = {
  routeLinks: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    path: PropTypes.string
  })).isRequired
}

export default HeaderDrawerList
