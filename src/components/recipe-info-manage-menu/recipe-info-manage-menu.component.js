import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { removeRecipe } from '../../redux/recipes/recipes.actions'

const RecipeInfoManageMenu = ({ recipeId }) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)

  function handleMenuOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function onRemoveClick() {
    dispatch(removeRecipe(recipeId))
  }

  return (
    <>
      <Button
        color='primary'
        variant='contained'
        fullWidth
        aria-controls='recipe-manage-menu'
        aria-haspopup='true'
        onClick={handleMenuOpen}
      >
        Manage Recipe
      </Button>
      <Menu
        id='recipe-manage-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        variant='menu'
        onClose={handleMenuClose}
      >
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>

          <Typography variant='inherit' noWrap>
            Edit
          </Typography>
        </MenuItem>

        <MenuItem onClick={onRemoveClick}>
          <ListItemIcon>
            <DeleteIcon color='secondary' fontSize='small' />
          </ListItemIcon>

          <Typography color='secondary' variant='inherit' noWrap>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

RecipeInfoManageMenu.propTypes = {
  recipeId: PropTypes.string.isRequired
}

export default RecipeInfoManageMenu
