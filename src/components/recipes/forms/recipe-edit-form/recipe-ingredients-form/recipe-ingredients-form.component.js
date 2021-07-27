import { useFieldArray, useFormContext } from 'react-hook-form'
import isNil from 'lodash.isnil'
import PropTypes from 'prop-types'

import { Button, List, makeStyles, Typography } from '@material-ui/core'
import RecipeIngredientsFormListItem
  from '../recipe-ingredients-form-list-item/recipe-ingredients-form-list-item.component'

const useStyles = makeStyles((theme) => ({
  helperText: {
    margin: theme.spacing(1, 0)
  },
  addBtn: {
    margin: theme.spacing(2, 0)
  }
}))

const RecipeIngredientsForm = ({ disabled }) => {
  const classes = useStyles()
  const { control, getValues, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  function addIngredient() {
    append({
      name: '',
      amount: 0
    })
  }

  function removeIngredient(fieldIndex) {
    if (isNil(fieldIndex) || disabled) return

    remove(fieldIndex)
  }

  const isEmptyList = !getValues('ingredients')?.length

  return (
    <>
      {
        isEmptyList ? (
            <Typography
              className={errors['ingredients'] ? classes.helperText : ''}
              variant='body2'
              color='secondary'
              component='p'
              align='center'
            >
              {errors['ingredients']?.message}
            </Typography>
          )
          : (
            <List>
              {
                fields.map((field, index) => (
                  <RecipeIngredientsFormListItem
                    key={field.id}
                    index={index}
                    control={control}
                    disabled={disabled}
                    onRemove={removeIngredient}
                  />
                ))
              }
            </List>
          )
      }

      <Button
        className={classes.addBtn}
        variant='contained'
        onClick={addIngredient}
        disabled={disabled}
      >
        Add ingredient
      </Button>
    </>
  )
}

RecipeIngredientsForm.propTypes = {
  disabled: PropTypes.bool.isRequired
}

export default RecipeIngredientsForm
