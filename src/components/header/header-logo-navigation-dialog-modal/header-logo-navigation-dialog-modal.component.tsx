import { FC } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

interface HeaderLogoNavigationDialogModalProps {
  open: boolean,
  onCancel: () => void,
  onConfirm: () => void
}

export const HeaderLogoNavigationDialogModal:
  FC<HeaderLogoNavigationDialogModalProps> = ({ open, onCancel, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby='confirm-remove-dialog-title'
  >
    <DialogTitle id='confirm-remove-dialog-title'>
      Changes will not be saved. Are you sure?
    </DialogTitle>
    <DialogActions>
      <Button onClick={onCancel}>
        Continue
      </Button>
      <Button onClick={onConfirm} color='secondary'>
        Go Back
      </Button>
    </DialogActions>
  </Dialog>
)
