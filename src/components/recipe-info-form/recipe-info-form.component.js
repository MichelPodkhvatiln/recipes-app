import { useReducer } from 'react'
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
import RecipeIngredientList from '../recipe-ingredient-list/recipe-ingredient-list.component'

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

  function addNewIngredient(newIngredientItem) {
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

  // const updateIngredientValues = useCallback((ingredientData) => {
  //   dispatch({
  //     type: RecipeInfoFormTypes.UPDATE_INGREDIENT_VALUES,
  //     payload: ingredientData
  //   })
  // }, [])
  //
  // const validateIngredientValues = useCallback((ingredientData) => {
  //   dispatch({
  //     type: RecipeInfoFormTypes.VALIDATE_INGREDIENT_VALUES,
  //     payload: ingredientData
  //   })
  // }, [])


  function onSubmit(data) {
    if (!state.ingredientsList.length) {
      // TODO add error message
      console.log('invalid')
      return
    }

    const ingredientsList = state.ingredientsList.map((listItem) => ({
      name: listItem.name,
      amount: listItem.amount,
    }))

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

      <RecipeIngredientList ingredientsList={state.ingredientsList} />
      <RecipeIngredientForm addNewIngredient={addNewIngredient} />

      <div className={classes.buttonGroup}>
        <Button
          type='submit'
          color='primary'
          variant='outlined'
          fullWidth
        >
          Create recipe
        </Button>
        <Button
          color='secondary'
          variant='outlined'
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
