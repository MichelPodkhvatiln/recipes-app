import { FC, useEffect } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useComponentLoading, useUnwrapAsyncThunk } from '../../../../hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { RecipeEditFormSchema } from './recipe-edit-form.validationSchema'
import { ROUTES } from '../../../../constants/routes'

import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import { RecipeImgPreviewForm } from './recipe-img-preview-form/recipe-img-preview-form.component'
import { RecipeInfoForm } from './recipe-info-form/recipe-info-form.component'
import { RecipeIngredientsForm } from './recipe-ingredients-form/recipe-ingredients-form.component'

import { selectCurrentUserId } from '../../../../redux/modules/user/user.selectors'
import { createRecipe, updateRecipe } from '../../../../redux/modules/recipes/recipes.actions'

import { IRecipeData, IRecipeEditFormData } from '../../../../interfaces'

interface IRecipeEditFormProps {
  recipeData?: IRecipeData
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  submitBtn: {
    margin: theme.spacing(2, 0)
  }
}))

const RecipeEditForm: FC<IRecipeEditFormProps> = ({ recipeData }) => {
  const classes = useStyles()
  const dispatch = useUnwrapAsyncThunk()
  const history = useHistory()

  const {
    loading,
    startLoading,
    onLoadingError
  } = useComponentLoading()

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

  async function onCreateRecipe(data: IRecipeEditFormData): Promise<void> {
    if (!currentUserId || loading) return

    try {
      startLoading()

      const { id } = await dispatch(createRecipe({
        ...data,
        author: currentUserId
      }))

      history.push(generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id }))
    } catch (err) {
      onLoadingError(err)
    }
  }

  async function onUpdateRecipe(data: IRecipeEditFormData): Promise<void> {
    if (!recipeData || !currentUserId || loading) return

    try {
      startLoading()

      const { id } = recipeData

      await dispatch(updateRecipe({
        id,
        updatedData: data
      }))

      history.push(generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id }))
    } catch (err) {
      onLoadingError(err)
    }
  }

  async function onSubmit(data: IRecipeEditFormData): Promise<void> {
    if (recipeData) {
      await onUpdateRecipe(data)
      return
    }

    await onCreateRecipe(data)
  }

  const submitBtnText = recipeData ? 'Update recipe' : 'Create recipe'

  return (
    <FormProvider {...formMethods}>
      <form
        className={classes.root}
        noValidate
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <RecipeImgPreviewForm disabled={loading} />
        <RecipeInfoForm disabled={loading} />
        <RecipeIngredientsForm disabled={loading} />

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

export default RecipeEditForm
