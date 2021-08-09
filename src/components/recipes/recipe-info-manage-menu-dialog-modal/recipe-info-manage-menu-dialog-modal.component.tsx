import { FC } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

interface IRecipeInfoManageMenuDialogModalProps {
  open: boolean,
  onCancel: () => void,
  onConfirm: () => Promise<void>
}

export const RecipeInfoManageMenuDialogModal
  : FC<IRecipeInfoManageMenuDialogModalProps> = ({ open, onCancel, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby='confirm-remove-dialog-title'
  >
    <DialogTitle id='confirm-remove-dialog-title'>
      Are you sure to remove this recipe?
    </DialogTitle>
    <DialogActions>
      <Button onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onConfirm} color='secondary'>
        Remove
      </Button>
    </DialogActions>
  </Dialog>
)
