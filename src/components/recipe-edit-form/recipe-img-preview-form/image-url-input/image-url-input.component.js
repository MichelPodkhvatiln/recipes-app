import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { REACT_HOOK_FORM_CONTROLLER_PROPS } from '../../../../constants/propTypes'

const ImageUrlInput = (props) => {
  const {
    field,
    fieldState,
    formState: {
      isValidating
    },
    setValidUrl
  } = props

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
      error={!!fieldState.error}
      helperText={!!fieldState.error && fieldState.error.message}
      {...field}
    />
  )
}

ImageUrlInput.propTypes = {
  ...REACT_HOOK_FORM_CONTROLLER_PROPS,
  setValidUrl: PropTypes.func.isRequired
}

export default ImageUrlInput
