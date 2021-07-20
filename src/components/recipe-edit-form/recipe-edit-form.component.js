import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { RecipePageFormSchema } from '../../validationSchemas'
import { RECIPE_DOC_PROPS } from '../../constants/propTypes'
import PropTypes from 'prop-types'

import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import RecipeImgPreviewForm from './recipe-img-preview-form/recipe-img-preview-form.component'
import RecipeInfoForm from './recipe-info-form/recipe-info-form.component'
import RecipeIngredientForm from './recipe-ingredients-form/recipe-ingredients-form.component'

import { createRecipe, updateRecipe } from '../../redux/recipes/recipes.actions'
import {
  selectCreateRecipeProcess,
  selectRecipeCreatedStatus,
  selectRecipeUpdatedStatus,
  selectUpdateRecipeProcess
} from '../../redux/recipes/recipes.selectors'
import { selectCurrentUserId } from '../../redux/user/user.selectors'


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
  const currentUserId = useSelector(selectCurrentUserId)
  const isCreateRecipeProcess = useSelector(selectCreateRecipeProcess)
  const isUpdateRecipeProcess = useSelector(selectUpdateRecipeProcess)
  const isRecipeCreatedStatus = useSelector(selectRecipeCreatedStatus)
  const isRecipeUpdatedStatus = useSelector(selectRecipeUpdatedStatus)

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RecipePageFormSchema)
  })

  const submitBtnText = recipeData ? 'Update recipe' : 'Create recipe'
  const isDisabledSubmitBtn = recipeData ? isUpdateRecipeProcess : isCreateRecipeProcess

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

  useEffect(() => {
    if (!isRecipeCreatedStatus) return

    history.push(ROUTES.RECIPES_PAGE)
  }, [isRecipeCreatedStatus, history])

  useEffect(() => {
    if (!isRecipeUpdatedStatus) return

    const path = ROUTES.DETAIL_RECIPE_PAGE.replace(':id', recipeData.id)
    console.log(path)
    history.push(path)
  }, [isRecipeUpdatedStatus, history, recipeData])

  function onCreateRecipe(recipeInfo) {
    if (!currentUserId || isCreateRecipeProcess) return

    dispatch(createRecipe({
      author: currentUserId,
      ...recipeInfo
    }))
  }

  function onUpdateRecipe(recipeInfo) {
    if (!currentUserId || isUpdateRecipeProcess) return

    const { id, createdAt } = recipeData

    dispatch(updateRecipe(id, {
      ...recipeInfo,
      createdAt
    }))
  }

  function onSubmit(recipeInfo) {
    if (recipeData) {
      onUpdateRecipe(recipeInfo)
      return
    }

    onCreateRecipe(recipeInfo)
  }

  return (
    <FormProvider {...formMethods}>
      <form
        className={classes.root}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <RecipeImgPreviewForm />
        <RecipeInfoForm />
        <RecipeIngredientForm />

        <Button
          className={classes.submitBtn}
          type='submit'
          color='primary'
          variant='contained'
          disabled={isDisabledSubmitBtn}
        >
          {
            isDisabledSubmitBtn ?
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
