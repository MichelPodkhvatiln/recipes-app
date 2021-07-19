import { useSelector } from 'react-redux'
import { useFieldArray, useFormContext } from 'react-hook-form'
import isNil from 'lodash.isnil'

import { Button, List } from '@material-ui/core'
import RecipeIngredientsFormListItem
  from './recipe-ingredients-form-list-item/recipe-ingredients-form-list-item.component'

import { selectCreateRecipeProcess } from '../../../redux/recipes/recipes.selectors'

const RecipeIngredientsForm = () => {
  const isCreateRecipeProcess = useSelector(selectCreateRecipeProcess)

  const { control } = useFormContext()
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
    if (isNil(fieldIndex) || isCreateRecipeProcess) return

    remove(fieldIndex)
  }

  return (
    <>
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
