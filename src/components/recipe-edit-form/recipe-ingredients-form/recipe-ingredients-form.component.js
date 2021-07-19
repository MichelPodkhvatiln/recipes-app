import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button, List } from '@material-ui/core'
import RecipeIngredientsFormListItem
  from './recipe-ingredients-form-list-item/recipe-ingredients-form-list-item.component'

const RecipeIngredientsForm = () => {
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
      >
        Add ingredient
      </Button>
    </>
  )
}

export default RecipeIngredientsForm
