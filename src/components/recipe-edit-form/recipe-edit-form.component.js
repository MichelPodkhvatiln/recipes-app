import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, makeStyles } from '@material-ui/core'
import RecipeImgPreviewForm from './recipe-img-preview-form/recipe-img-preview-form.component'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const validationSchema = yup.object().shape({
  imageUrl: yup.string().url()
})

const RecipeEditForm = () => {
  const classes = useStyles()
  const formMethods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
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

        <Button
          type='submit'
          color='primary'
          variant='outlined'
        >
          Submit
        </Button>
      </form>

    </FormProvider>
  )
}

export default RecipeEditForm
