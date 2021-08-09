import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { TextField } from '@material-ui/core'

interface IRecipeInfoFormProps {
  disabled: boolean
}

export const RecipeInfoForm: FC<IRecipeInfoFormProps> = ({ disabled }) => {
  const methods = useFormContext()

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
            disabled={disabled}
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
            disabled={disabled}
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
