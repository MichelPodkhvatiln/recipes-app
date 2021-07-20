import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { RecipePageFormSchema } from '../../validationSchemas'

import { Button, CircularProgress, makeStyles } from '@material-ui/core'
import RecipeImgPreviewForm from './recipe-img-preview-form/recipe-img-preview-form.component'
import RecipeInfoForm from './recipe-info-form/recipe-info-form.component'
import RecipeIngredientForm from './recipe-ingredients-form/recipe-ingredients-form.component'

import { createRecipe } from '../../redux/recipes/recipes.actions'
import { selectCreateRecipeProcess, selectRecipeCreatedStatus } from '../../redux/recipes/recipes.selectors'
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

const RecipeEditForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const isCreateRecipeProcess = useSelector(selectCreateRecipeProcess)
  const isRecipeCreatedStatus = useSelector(selectRecipeCreatedStatus)
  const currentUserId = useSelector(selectCurrentUserId)

  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RecipePageFormSchema)
  })

  useEffect(() => {
    if (!isRecipeCreatedStatus) return

    history.push(ROUTES.RECIPES_PAGE)
  }, [isRecipeCreatedStatus, history])

  function onCreateRecipe(recipeInfo) {
    if (!currentUserId || isCreateRecipeProcess) return

    dispatch(createRecipe({
      author: currentUserId,
      ...recipeInfo
    }))
  }

  function onSubmit(recipeInfo) {
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
          disabled={isCreateRecipeProcess}
        >
          {
            isCreateRecipeProcess ?
              <CircularProgress color='inherit' size={24} />
              :
              'Submit'
          }
        </Button>
      </form>
    </FormProvider>
  )
}

export default RecipeEditForm
