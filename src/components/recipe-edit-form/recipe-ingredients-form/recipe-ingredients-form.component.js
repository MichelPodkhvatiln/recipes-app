import { useSelector } from 'react-redux'
import { useFieldArray, useFormContext } from 'react-hook-form'
import isNil from 'lodash.isnil'

import { Button, List, Typography } from '@material-ui/core'
import RecipeIngredientsFormListItem
  from './recipe-ingredients-form-list-item/recipe-ingredients-form-list-item.component'

import { selectCreateRecipeProcess } from '../../../redux/recipes/recipes.selectors'

const RecipeIngredientsForm = () => {
  const { control, getValues } = useFormContext()
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
        isEmptyList &&
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          align='center'
        >
          Ingredients field must have at least 1 items
        </Typography>
      }

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

      <Button
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
