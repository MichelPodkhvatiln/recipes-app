import { useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { ShoppingListSchema } from '../../validationSchemas'
import { v4 as uuidv4 } from 'uuid'

import { Button, makeStyles, TextField } from '@material-ui/core'

import { selectEditingListItemId, selectShoppingListItemById } from '../../redux/shopping-list/shopping-list.selectors'
import {
  addShoppingListItem,
  removeShoppingListItem,
  resetEditingShoppingListItem,
  updateShoppingListItem
} from '../../redux/shopping-list/shopping-list.actions'


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

const defaultValues = {
  name: '',
  amount: ''
}

const ShoppingListForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editingListItemId = useSelector(selectEditingListItemId)
  const editingListItemData = useSelector(selectShoppingListItemById(editingListItemId))

  const { handleSubmit, reset, getValues, control } = useForm({
    defaultValues,
    resolver: yupResolver(ShoppingListSchema)
  })

  const resetEditMode = useCallback(() => {
    reset(defaultValues)
    dispatch(resetEditingShoppingListItem())
  }, [reset, dispatch])

  useEffect(() => {
    resetEditMode()
  }, [resetEditMode])

  useEffect(() => {
    if (!editingListItemData) return

    reset({
      name: editingListItemData.name,
      amount: editingListItemData.amount
    })

    return () => {
      if (!editingListItemData) return

      resetEditMode()
    }
  }, [editingListItemData, reset, resetEditMode])

  function resetForm() {
    reset(defaultValues)

    if (editingListItemId) {
      dispatch(resetEditingShoppingListItem())
    }
  }

  function onSubmit(formData) {
    if (!editingListItemId) {
      dispatch(addShoppingListItem({
        ...formData,
        id: uuidv4()
      }))
    } else {
      dispatch(updateShoppingListItem(formData))
    }

    resetForm()
  }

  function onRemoveClick() {
    if (!editingListItemId) return

    dispatch(removeShoppingListItem(editingListItemId))
    resetForm()
  }

  function onResetClick() {
    const cantResetForm = Object.values(getValues()).every((value) => value === '')
    if (cantResetForm) return

    resetForm()
  }

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label='Name'
            variant='outlined'
            size='small'
            type='text'
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            {...field}
          />
        )}
        name='name'
        control={control}
      />
      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label='Amount'
            variant='outlined'
            size='small'
            type='number'
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            {...field}
          />
        )}
        name='amount'
        control={control}
      />
      <div className={classes.buttonGroup}>
        <Button type='submit' variant='outlined' color='primary'>
          {
            editingListItemId ? 'Update' : 'Add'
          }
        </Button>
        {
          editingListItemId &&
          <Button variant='outlined' color='secondary' onClick={onRemoveClick}>Remove</Button>
        }

        <Button variant='outlined' onClick={onResetClick}>Clear</Button>
      </div>
    </form>
  )
}

export default ShoppingListForm
