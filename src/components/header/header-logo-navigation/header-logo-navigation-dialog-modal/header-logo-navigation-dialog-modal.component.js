import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

const HeaderLogoNavigationDialogModal = ({ open, onCancel, onConfirm }) => {
  return (
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
}

export default HeaderLogoNavigationDialogModal
