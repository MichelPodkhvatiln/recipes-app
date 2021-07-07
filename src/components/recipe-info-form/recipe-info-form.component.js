import { Controller, useForm } from 'react-hook-form'
import { Button, makeStyles, TextField } from '@material-ui/core'
import RecipeImageUrlInput from '../recipe-image-url-input/recipe-image-url-input.component'

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
    justifyContent: 'flex-end',
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(0.5)
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
  const { handleSubmit, control } = useForm({
    defaultValues
  })

  function onSubmit(data) {
    console.log(data)
  }

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        render={({ field }) => <RecipeImageUrlInput field={field} />}
        name='imageURL'
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextField
            label='Name'
            variant='outlined'
            type='text'
            margin='dense'
            fullWidth
            {...field}
          />
        )}
        name='name'
        control={control}
      />
      <Controller
        render={({ field }) => (
          <TextField
            label='Description'
            variant='outlined'
            type='text'
            margin='dense'
            fullWidth
            multiline
            rows={4}
            rowsMax={8}
            {...field}
          />
        )}
        name='description'
        control={control}
      />
      <Button type='submit'>
        Submit
      </Button>
    </form>
  )
}

export default RecipeInfoForm
