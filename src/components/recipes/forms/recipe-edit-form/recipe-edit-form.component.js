import { useEffect, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { RecipeEditFormSchema } from './recipe-edit-form.validationSchema'
import { ROUTES } from '../../../../constants/routes'
import { RECIPE_DOC_PROPS } from '../../../../constants/propTypes'
import PropTypes from 'prop-types'

import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import RecipeImgPreviewForm from './recipe-img-preview-form/recipe-img-preview-form.component'
import RecipeInfoForm from './recipe-info-form/recipe-info-form.component'
import RecipeIngredientForm from './recipe-ingredients-form/recipe-ingredients-form.component'

import { selectCurrentUserId } from '../../../../redux/modules/user/user.selectors'
import { createRecipe, updateRecipe } from '../../../../redux/modules/recipes/recipes.actions'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  submitBtn: {
    margin: theme.spacing(2, 0)
  }
}))

const RecipeEditForm = ({ recipeData }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [state, setState] = useState({
    loading: false,
    error: null
  })
  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RecipeEditFormSchema)
  })

  const currentUserId = useSelector(selectCurrentUserId)

  useEffect(() => {
    if (!recipeData) return

    const { setValue } = formMethods
    const { imageUrl, name, description, ingredients } = recipeData

    setValue('imageUrl', imageUrl)
    setValue('name', name)
    setValue('description', description)
    setValue('ingredients', ingredients)
    // eslint-disable-next-line
  }, [])

  async function onCreateRecipe(data) {
    if (!currentUserId || loading) return

    try {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))

      const { payload: { id } } = await dispatch(createRecipe({
        ...data,
        author: currentUserId
      }))

      history.push(generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id }))
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: err
      }))
    }
  }

  async function onUpdateRecipe(data) {
    if (!currentUserId || loading) return

    try {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))

      const { id } = recipeData

      await dispatch(updateRecipe({
        id,
        updatedData: data
      }))

      history.push(generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id }))
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: err
      }))
    }
  }

  async function onSubmit(data) {
    if (recipeData) {
      await onUpdateRecipe(data)
      return
    }

    await onCreateRecipe(data)
  }

  const submitBtnText = recipeData ? 'Update recipe' : 'Create recipe'
  const { loading } = state

  return (
    <FormProvider {...formMethods}>
      <form
        className={classes.root}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <RecipeImgPreviewForm disabled={loading} />
        <RecipeInfoForm disabled={loading} />
        <RecipeIngredientForm disabled={loading} />

        <Button
          className={classes.submitBtn}
          type='submit'
          color='primary'
          variant='contained'
          disabled={loading}
        >
          {
            loading ?
              <CircularProgress color='inherit' size={24} />
              :
              submitBtnText
          }
        </Button>
      </form>
    </FormProvider>
  )
}

RecipeEditForm.propTypes = {
  recipeData: PropTypes.shape(RECIPE_DOC_PROPS)
}

export default RecipeEditForm
