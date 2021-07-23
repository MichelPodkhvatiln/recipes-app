import { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { checkImgSrc } from '../../../utils'
import { SMALL_IMAGE_PLACEHOLDER } from '../../../constants/placeholders'

import { Card, CardMedia, debounce } from '@material-ui/core'
import ImageUrlInput from './image-url-input/image-url-input.component'

const RecipeImgPreviewForm = ({ disabled }) => {
  const [imageUrl, setImageUrl] = useState('')
  const methods = useFormContext()

  function setValidUrl(newImageUrl) {
    const _debouncedUpdateState = debounce((newImageUrl) => {
      const _successHandler = () => {
        setImageUrl(newImageUrl)
      }

      const _errorHandler = () => {
        setImageUrl('')
      }

      checkImgSrc(newImageUrl, _successHandler, _errorHandler)
    }, 350)

    _debouncedUpdateState(newImageUrl)
  }

  const cardMediaImageUrl = imageUrl.trim().length ? imageUrl : SMALL_IMAGE_PLACEHOLDER

  return (
    <>
      <Card>
        <CardMedia
          component='img'
          height='160'
          image={cardMediaImageUrl}
        />
      </Card>

      <Controller
        render={(props) => (
          <ImageUrlInput
            setValidUrl={setValidUrl}
            disabled={disabled}
            {...props}
          />)}
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
