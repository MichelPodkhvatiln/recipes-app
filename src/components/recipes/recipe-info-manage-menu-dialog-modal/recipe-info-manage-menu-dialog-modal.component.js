import PropTypes from 'prop-types'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

const RecipeInfoManageMenuDialogModal = ({ open, onCancel, onConfirm }) => (
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

RecipeInfoManageMenuDialogModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default RecipeInfoManageMenuDialogModal
