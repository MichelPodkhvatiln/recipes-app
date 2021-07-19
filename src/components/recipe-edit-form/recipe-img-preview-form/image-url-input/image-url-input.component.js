import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { REACT_HOOK_FORM_CONTROLLER_PROPS } from '../../../../constants/propTypes'

import { selectCreateRecipeProcess } from '../../../../redux/recipes/recipes.selectors'

const ImageUrlInput = (props) => {
  const {
    field,
    fieldState,
    formState: {
      isValidating
    },
    setValidUrl
  } = props

  const isCreateRecipeProcess = useSelector(selectCreateRecipeProcess)

  useEffect(() => {
    if (isValidating) return

    const { invalid } = fieldState

    if (invalid) return

    const { value } = field

    setValidUrl(value)
  }, [isValidating])

  return (
    <TextField
      label='Image preview URL'
      type='text'
      variant='outlined'
      margin='dense'
      fullWidth
      error={!!fieldState.error}
      helperText={!!fieldState.error && fieldState.error.message}
      disabled={isCreateRecipeProcess}
      {...field}
    />
  )
}

ImageUrlInput.propTypes = {
  ...REACT_HOOK_FORM_CONTROLLER_PROPS,
  setValidUrl: PropTypes.func.isRequired
}

export default ImageUrlInput
