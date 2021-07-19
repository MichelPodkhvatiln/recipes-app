import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { RecipePageFormSchema } from '../../validationSchemas'

import { Button, makeStyles } from '@material-ui/core'
import RecipeImgPreviewForm from './recipe-img-preview-form/recipe-img-preview-form.component'
import RecipeInfoForm from './recipe-info-form/recipe-info-form.component'
import RecipeIngredientForm from './recipe-ingredients-form/recipe-ingredients-form.component'

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
  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(RecipePageFormSchema)
  })

  function onSubmit(data) {
    console.log(data)
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
        >
          Submit
        </Button>
      </form>

    </FormProvider>
  )
}

export default RecipeEditForm
