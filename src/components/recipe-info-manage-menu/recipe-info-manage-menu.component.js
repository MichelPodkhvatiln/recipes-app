import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { removeRecipe } from '../../redux/recipes/recipes.actions'
import RecipeInfoManageMenuDialogModal
  from './recipe-info-manage-menu-dialog-modal/recipe-info-manage-menu-dialog-modal.component'
import { ROUTES } from '../../constants/routes'

const RecipeInfoManageMenu = ({ recipeId }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  function goToEditRecipePage() {
    const path = ROUTES.EDIT_RECIPE_PAGE.replace(':id', recipeId)

    history.push(path)
  }

  function handleMenuOpen(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function toggleRemoveConfirmModal() {
    setOpenModal((prevState) => !prevState)
  }

  function onRemoveClick() {
    toggleRemoveConfirmModal()
  }

  function onRemoveConfirmClick() {
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
        <MenuItem onClick={goToEditRecipePage}>
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

      <RecipeInfoManageMenuDialogModal
        open={openModal}
        onCancel={toggleRemoveConfirmModal}
        onConfirm={onRemoveConfirmClick}
      />
    </>
  )
}

RecipeInfoManageMenu.propTypes = {
  recipeId: PropTypes.string.isRequired
}

export default RecipeInfoManageMenu
