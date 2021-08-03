import { FC, MouseEvent, useState } from 'react'
import { useUnwrapAsyncThunk } from '../../../hooks'
import { useHistory } from 'react-router-dom'
import { APP_ROUTES } from '../../../constants/routes'

import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { RecipeInfoManageMenuDialogModal } from '../recipe-info-manage-menu-dialog-modal/recipe-info-manage-menu-dialog-modal.component'

import { deleteRecipe } from '../../../redux/modules/recipes/recipes.actions'

interface IRecipeInfoManageMenuProps {
  id: string
}

export const RecipeInfoManageMenu: FC<IRecipeInfoManageMenuProps> = ({ id }) => {
  const dispatch = useUnwrapAsyncThunk()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null)
  const [openModal, setOpenModal] = useState(false)

  function goToEditRecipePage(): void {
    history.push(APP_ROUTES.RECIPES_ROUTES.EDIT_RECIPE_PAGE(id))
  }

  function handleMenuOpen(event: MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget)
  }

  function handleMenuClose(): void {
    setAnchorEl(null)
  }

  function toggleRemoveConfirmModal(): void {
    setOpenModal((prevState) => !prevState)
  }

  function onRemoveClick(): void {
    toggleRemoveConfirmModal()
  }

  async function onRemoveConfirmClick(): Promise<void> {
    try {
      await dispatch(deleteRecipe(id))
      history.push(APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE())
    } catch (err) {
      console.error(err)
    }
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
