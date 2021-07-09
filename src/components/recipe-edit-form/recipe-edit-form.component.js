import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, makeStyles } from '@material-ui/core'
import RecipeImgPreviewForm from './recipe-img-preview-form/recipe-img-preview-form.component'
import RecipeInfoForm from './recipe-info-form/recipe-info-form.component'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}))

const validationSchema = yup.object().shape({
  imageUrl: yup.string()
    .url('Value must be a valid URL'),
  name: yup.string()
    .required('Name is a required field'),
  description: yup.string()
    .required('Description is a required field')
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
        <RecipeInfoForm />

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
