import { FC } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button, List, makeStyles, Typography } from '@material-ui/core'
import { RecipeIngredientsFormListItem } from '../recipe-ingredients-form-list-item/recipe-ingredients-form-list-item.component'

interface IRecipeInfoFormProps {
  disabled: boolean
}

const useStyles = makeStyles((theme) => ({
  helperText: {
    margin: theme.spacing(1, 0)
  },
  addBtn: {
    margin: theme.spacing(2, 0)
  }
}))

export const RecipeIngredientsForm: FC<IRecipeInfoFormProps> = ({ disabled }) => {
  const classes = useStyles()
  const { control, getValues, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients'
  })

  function addIngredient(): void {
    append({
      name: '',
      amount: 0
    })
  }

  function removeIngredient(fieldIndex: number): void {
    if (disabled) return

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
                //TODO Не понятно почему не подтягиваются типы, при след апдейте библиотеки проверить еще раз
                // @ts-ignore
                fields.map((field: { id: string, name: string, amount: string | number }, index) => {
                  const defaultValues = {
                    name: field.name,
                    amount: field.amount
                  }
                  return (
                    <RecipeIngredientsFormListItem
                      key={field.id}
                      index={index}

                      control={control}
                      disabled={disabled}
                      defaultValues={defaultValues}
                      onRemove={removeIngredient}
                    />
                  )
                })
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
