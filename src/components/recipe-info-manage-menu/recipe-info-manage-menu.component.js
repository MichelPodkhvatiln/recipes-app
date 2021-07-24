import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { generatePath, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { ROUTES } from '../../constants/routes'

import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RecipeInfoManageMenuDialogModal
  from './recipe-info-manage-menu-dialog-modal/recipe-info-manage-menu-dialog-modal.component'

import { deleteRecipe } from '../../redux/modules/recipes/recipes.actions'

const RecipeInfoManageMenu = ({ id }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  function goToEditRecipePage() {
    history.push(generatePath(ROUTES.EDIT_RECIPE_PAGE, { id }))
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

  async function onRemoveConfirmClick() {
    await dispatch(deleteRecipe(id))
    history.push(ROUTES.RECIPES_PAGE)
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
  id: PropTypes.string.isRequired
}

export default RecipeInfoManageMenu
