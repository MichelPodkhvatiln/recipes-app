import { useCallback, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RecipePageFormSchema } from '../../validationSchemas'
import { ROUTES } from '../../constants/routes'

import { Link as RouterLink } from 'react-router-dom'
import { Button, makeStyles, TextField } from '@material-ui/core'
import RecipeImageUrlInput from '../recipe-image-url-input/recipe-image-url-input.component'
import RecipeIngredientForm from '../recipe-ingredient-form/recipe-ingredient-form.component'

import { RecipeInfoFormInit, RecipeInfoFormReducer } from './innerState/reducer'
import RecipeInfoFormTypes from './innerState/action.types'

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
    '& .MuiButtonBase-root': {
      '&:not(:last-child)': {
        marginRight: theme.spacing(0.5)
      }
    }
  }
}))


const defaultValues = {
  name: '',
  imageURL: '',
  description: ''
}

const RecipeInfoForm = () => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(RecipeInfoFormReducer, [], RecipeInfoFormInit)
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: yupResolver(RecipePageFormSchema)
  })

  function addNewIngredient() {
    const newIngredientItem = {
      id: uuidv4(),
      errors: {
        name: {
          isValid: true,
          message: ''
        },
        amount: {
          isValid: true,
          message: ''
        }
      },
      values: {
        name: '',
        amount: ''
      }
    }

    dispatch({
      type: RecipeInfoFormTypes.CREATE_NEW_INGREDIENT,
      payload: newIngredientItem
    })
  }

  function removeIngredient(ingredientId) {
    dispatch({
      type: RecipeInfoFormTypes.REMOVE_INGREDIENT,
      payload: ingredientId
    })
  }

  const updateIngredientValues = useCallback((ingredientData) => {
    dispatch({
      type: RecipeInfoFormTypes.UPDATE_INGREDIENT_VALUES,
      payload: ingredientData
    })
  }, [])

  const validateIngredientValues = useCallback((ingredientData) => {
    dispatch({
      type: RecipeInfoFormTypes.VALIDATE_INGREDIENT_VALUES,
      payload: ingredientData
    })
  }, [])


  function onSubmit(data) {
    const everyIngredientsFieldIsValid = state.ingredientsList.every((listItem) => {
      return listItem.errors.name.isValid && listItem.errors.amount.isValid
    })

    if (!state.ingredientsList.length || !everyIngredientsFieldIsValid) {
      // TODO add error message
      console.log('invalid')
      return
    }

    const ingredientsList = state.ingredientsList.map((listItem) => ({ ...listItem.values }))

    console.log({
      ...data,
      ingredientsList
    })
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
          <RecipeImageUrlInput field={field} fieldState={fieldState} />
        )}
        name='imageURL'
        control={control}
      />
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
            label='Description'
            variant='outlined'
            type='text'
            margin='dense'
            fullWidth
            multiline
            rows={4}
            rowsMax={8}
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            {...field}
          />
        )}
        name='description'
        control={control}
      />

      <RecipeIngredientForm
        ingredientsList={state.ingredientsList}
        addNewIngredient={addNewIngredient}
        removeIngredient={removeIngredient}
        updateIngredientValues={updateIngredientValues}
        validateIngredientValues={validateIngredientValues}
      />

      <div className={classes.buttonGroup}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullWidth
        >
          Create recipe
        </Button>
        <Button
          color='secondary'
          variant='contained'
          component={RouterLink}
          to={ROUTES.RECIPES_PAGE}
          fullWidth
        >
          Cancel
        </Button>
      </div>

    </form>
  )
}

export default RecipeInfoForm
