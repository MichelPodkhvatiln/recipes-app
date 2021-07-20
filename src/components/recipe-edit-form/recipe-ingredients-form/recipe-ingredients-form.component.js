import { useSelector } from 'react-redux'
import { useFieldArray, useFormContext } from 'react-hook-form'
import isNil from 'lodash.isnil'

import { Button, List, makeStyles, Typography } from '@material-ui/core'
import RecipeIngredientsFormListItem
  from './recipe-ingredients-form-list-item/recipe-ingredients-form-list-item.component'

import { selectCreateRecipeProcess } from '../../../redux/recipes/recipes.selectors'

const useStyles = makeStyles((theme) => ({
  helperText: {
    margin: theme.spacing(1, 0)
  },
  addBtn: {
    margin: theme.spacing(2, 0)
  }
}))

const RecipeIngredientsForm = () => {
  const classes = useStyles()
  const { control, getValues, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  const isCreateRecipeProcess = useSelector(selectCreateRecipeProcess)
  const isEmptyList = !getValues('ingredients')?.length

  function addIngredient() {
    append({
      name: '',
      amount: 0
    })
  }

  function removeIngredient(fieldIndex) {
    if (isNil(fieldIndex) || isCreateRecipeProcess) return

    remove(fieldIndex)
  }

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
        disabled={isCreateRecipeProcess}
      >
        Add ingredient
      </Button>
    </>
  )
}

export default RecipeIngredientsForm
