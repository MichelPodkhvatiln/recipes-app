import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, makeStyles, TextField } from '@material-ui/core'
import { selectEditingListItem } from '../../redux/shopping-list/shopping-list.selectors'
import { removeShoppingListItem, resetEditingShoppingListItem } from '../../redux/shopping-list/shopping-list.actions'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: theme.spacing(1),
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(0.5)
    }
  }
}))

const INIT_FORM_DATA = {
  name: '',
  amount: ''
}

const ShoppingProductListForm = ({ onSubmit }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editingListItem = useSelector(selectEditingListItem)

  const [formData, setFormData] = useState(INIT_FORM_DATA)

  useEffect(() => {
    if (!editingListItem) return

    const { name, amount } = editingListItem

    setFormData({
      name,
      amount
    })
  }, [editingListItem])

  function handleInputChange({ target: { name, value } }) {
    if (!value.trim().length) {
      setFormData((prevState) => ({ ...prevState, [name]: '' }))
      return
    }

    if (name === 'amount') {
      const numValue = Number(value) < 0 ? 0 : Number(value)
      setFormData((prevState) => ({ ...prevState, [name]: numValue }))
      return
    }

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleSubmitForm(e) {
    e.preventDefault()

    onSubmit(formData)
    resetForm()
  }

  function onRemoveClick() {
    if (!editingListItem) return

    dispatch(removeShoppingListItem(editingListItem.id))
    resetForm()
  }

  function resetForm() {
    setFormData(INIT_FORM_DATA)

    if (editingListItem) {
      dispatch(resetEditingShoppingListItem())
    }
  }

  return (
    <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmitForm}>
      <TextField
        name='name'
        label='Name'
        variant='outlined'
        size='small'
        value={formData.name}
        onChange={handleInputChange}
      />
      <TextField
        name='amount'
        label='Amount'
        variant='outlined'
        size='small'
        type='number'
        value={formData.amount}
        onChange={handleInputChange}
      />

      <div className={classes.buttonGroup}>
        <Button type='submit' variant='outlined' color='primary'>
          {
            editingListItem ? 'Update' : 'Add'
          }
        </Button>
        {
          editingListItem &&
          <Button variant='outlined' color='secondary' onClick={onRemoveClick}>Remove</Button>
        }

        <Button variant='outlined' onClick={resetForm}>Clear</Button>
      </div>
    </form>
  )
}

ShoppingProductListForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ShoppingProductListForm
