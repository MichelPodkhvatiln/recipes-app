import { Card, CardMedia, debounce, TextField } from '@material-ui/core'
import { useEffect, useMemo, useState } from 'react'

const RecipeImageUrlInput = ({ field, fieldState }) => {
  const [inputValue, setInputValue] = useState('')
  const { onChange, value, ...rest } = field

  const debouncedCheckImgSrc = useMemo(() => debounce((value) => {
    const setValidValue = () => {
      onChange(value)
    }

    const setEmptyValue = () => {
      onChange('')
    }

    checkImgSrc(value, setValidValue, setEmptyValue)
  }, 500), [onChange])

  function checkImgSrc(src, successHandler, errorHandler) {
    const img = new Image()
    img.onload = () => {
      successHandler()
    }
    img.onerror = () => {
      errorHandler()
    }
    img.src = src
  }

  function customOnChangeHandler({ target: { value } }) {
    setInputValue(value)
  }

  useEffect(() => {
    debouncedCheckImgSrc(inputValue)
  }, [inputValue, debouncedCheckImgSrc])

  return (
    <>
      <Card style={{ marginBottom: 15 }}>
        <CardMedia
          component='img'
          height='160'
          image={
            field.value.trim().length ? field.value : imagePlaceholderURL
          }
        />
      </Card>

      <TextField
        label='Image preview URL'
        variant='outlined'
        type='text'
        margin='dense'
        fullWidth
        value={inputValue}
        onChange={customOnChangeHandler}
        error={!!fieldState.error}
        helperText={!!fieldState.error && fieldState.error.message}
        {...rest}
      />
    </>
  )
}

export default RecipeImageUrlInput
