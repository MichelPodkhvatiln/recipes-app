import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ShoppingListSchema } from '../../../validationSchemas'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import { Button, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  textInputsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  nameTextInput: {
    width: '60%'
  },
  amountTextInput: {
    width: '35%'
  }
}))

const defaultValues = {
  name: '',
  amount: ''
}

const RecipeIngredientForm = ({ addNewIngredient }) => {
  const classes = useStyles()
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(ShoppingListSchema)
  })

  function onSubmit() {
    handleSubmit((data) => {
      addNewIngredient({
        id: uuidv4(),
        ...data
      })
      reset(defaultValues)
    })()
  }

  return (
    <div className={classes.root}>
      <div className={classes.textInputsWrap}>
        <Controller
          render={({ field, fieldState }) => (
            <TextField
              className={classes.nameTextInput}
              label='Name'
              type='text'
              name='name'
              variant='outlined'
              margin='dense'
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
              className={classes.amountTextInput}
              label='Amount'
              type='number'
              name='amount'
              variant='outlined'
              margin='dense'
              error={!!fieldState.error}
              helperText={!!fieldState.error && fieldState.error.message}
              {...field}
            />
          )}
          name='amount'
          control={control}
        />
      </div>

      <Button
        type='button'
        variant='outlined'
        fullWidth
        onClick={onSubmit}
      >
        Add ingredient
      </Button>
    </div>
  )
}

RecipeIngredientForm.protTypes = {
  addNewIngredient: PropTypes.func.isRequired
}

export default RecipeIngredientForm
