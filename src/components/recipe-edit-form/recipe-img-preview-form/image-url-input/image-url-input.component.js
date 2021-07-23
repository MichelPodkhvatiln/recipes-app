import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { REACT_HOOK_FORM_CONTROLLER_PROPS } from '../../../../constants/propTypes'

import { TextField } from '@material-ui/core'

const ImageUrlInput = (props) => {
  const {
    field,
    fieldState,
    formState: {
      isValidating
    },
    setValidUrl,
    disabled
  } = props


  useEffect(() => {
    if (isValidating) return

    const { invalid } = fieldState

    if (invalid) return

    const { value } = field

    setValidUrl(value)

    // eslint-disable-next-line
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
      disabled={disabled}
      {...field}
    />
  )
}

ImageUrlInput.propTypes = {
  ...REACT_HOOK_FORM_CONTROLLER_PROPS,
  setValidUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default ImageUrlInput
