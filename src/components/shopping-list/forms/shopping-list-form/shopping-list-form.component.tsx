import { FC, useCallback, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../hooks'
import { nanoid } from '@reduxjs/toolkit'
import { yupResolver } from '@hookform/resolvers/yup'
import { ShoppingListSchema } from './shopping-list-form.validationSchema'

import { IShoppingListFormData, IShoppingListItem } from '../../../../interfaces'

import { Button, makeStyles, TextField } from '@material-ui/core'

import {
  selectEditingListItemId,
  selectShoppingListItemById
} from '../../../../redux/modules/shopping-list/shopping-list.selectors'
import {
  addShoppingListItem,
  removeShoppingListItem,
  resetEditingShoppingListItem,
  updateShoppingListItem
} from '../../../../redux/modules/shopping-list/shopping-list.actions'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: 600,
    margin: '0 auto',
    marginBottom: theme.spacing(3),
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(1)
    }
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(0.5)
    }
  }
}))

const formDefaultData: IShoppingListFormData = {
  name: '',
  amount: ''
}

export const ShoppingListForm: FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const editingListItemId = useAppSelector(selectEditingListItemId)
  const editingListItemData = useAppSelector(selectShoppingListItemById(editingListItemId))

  const { handleSubmit, reset, getValues, control } = useForm({
    defaultValues: formDefaultData,
    resolver: yupResolver(ShoppingListSchema)
  })

  const resetEditMode = useCallback(() => {
    reset(formDefaultData)
    dispatch(resetEditingShoppingListItem())
  }, [reset, dispatch])

  useEffect(() => {
    setTimeout(() => {
      resetEditMode()
    }, 0)

    return () => {
      resetEditMode()
    }
  }, [resetEditMode])

  useEffect(() => {
    if (!editingListItemData) return

    reset({
      name: editingListItemData.name,
      amount: editingListItemData.amount
    })
  }, [editingListItemData, reset])

  function resetForm(): void {
    reset(formDefaultData)

    if (!editingListItemId) return

    dispatch(resetEditingShoppingListItem())
  }

  function onSubmit(formData: IShoppingListFormData): void {
    if (!editingListItemId) {
      const listItem: IShoppingListItem = {
        ...formData,
        id: nanoid()
      }

      dispatch(addShoppingListItem(listItem))
    } else {
      dispatch(updateShoppingListItem(formData))
    }

    setTimeout(() => {
      resetForm()
    }, 100)
  }

  function onRemoveClick(): void {
    if (!editingListItemId) return

    dispatch(removeShoppingListItem(editingListItemId))
    resetForm()
  }

  function onResetClick(): void {
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
            type='text'
            margin='dense'
            fullWidth
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
            type='number'
            margin='dense'
            fullWidth
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
            editingListItemId && editingListItemData ? 'Update' : 'Add'
          }
        </Button>
        {
          (editingListItemId && editingListItemData) &&
          <Button variant='outlined' color='secondary' onClick={onRemoveClick}>Remove</Button>
        }

        <Button variant='outlined' onClick={onResetClick}>Clear</Button>
      </div>
    </form>
  )
}
