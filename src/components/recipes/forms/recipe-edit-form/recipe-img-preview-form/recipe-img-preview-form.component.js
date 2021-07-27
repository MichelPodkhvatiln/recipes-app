import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { SMALL_IMAGE_PLACEHOLDER } from '../../../../../constants/placeholders'

import { Card, CardMedia, debounce, TextField } from '@material-ui/core'

const RecipeImgPreviewForm = ({ disabled }) => {
  const [imageUrl, setImageUrl] = useState('')
  const methods = useFormContext()
  const imageUrlFormValue = useWatch({
    name: 'imageUrl',
    control: methods.control,
    defaultValue: ''
  })

  useEffect(() => {
    if (!imageUrlFormValue?.trim().length) return

    const _debouncedUpdateState = debounce(() => {
      setImageUrl(imageUrlFormValue)
    }, 500)

    _debouncedUpdateState()
  }, [imageUrlFormValue])

  const cardMediaImageUrl = imageUrl.trim().length ? imageUrl : SMALL_IMAGE_PLACEHOLDER

  return (
    <>
      <Card>
        <CardMedia
          component='img'
          height='160'
          image={cardMediaImageUrl}
          title='Recipe preview image'
          alt='Recipe preview image'
        />
      </Card>

      <Controller
        render={({ field, fieldState }) => (
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
        )}
        name='imageUrl'
        defaultValue=''
        control={methods.control}
      />
    </>
  )
}

RecipeImgPreviewForm.propTypes = {
  disabled: PropTypes.bool.isRequired
}

export default RecipeImgPreviewForm
