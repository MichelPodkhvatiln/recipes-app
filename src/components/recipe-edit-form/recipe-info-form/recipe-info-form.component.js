import { useSelector } from 'react-redux'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField } from '@material-ui/core'

import { selectActionRecipeProcess } from '../../../redux/recipes/recipes.selectors'

const RecipeInfoForm = () => {
  const methods = useFormContext()
  const isActionRecipeProcess = useSelector(selectActionRecipeProcess)

  return (
    <>
      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label='Name'
            type='text'
            variant='outlined'
            margin='dense'
            fullWidth
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            disabled={isActionRecipeProcess}
            {...field}
          />
        )}
        name='name'
        defaultValue=''
        control={methods.control}
      />
      <Controller
        render={({ field, fieldState }) => (
          <TextField
            label='Description'
            type='text'
            variant='outlined'
            margin='dense'
            fullWidth
            multiline
            rows={4}
            rowsMax={8}
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            disabled={isActionRecipeProcess}
            {...field}
          />
        )}
        name='description'
        defaultValue=''
        control={methods.control}
      />
    </>
  )
}

export default RecipeInfoForm
