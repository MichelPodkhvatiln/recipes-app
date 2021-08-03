import * as yup from 'yup'
import { ShoppingListSchema } from '../../../shopping-list/forms/shopping-list-form/shopping-list-form.validationSchema'

export const RecipeEditFormSchema = yup.object().shape({
  imageUrl: yup.string()
    .url('Value must be a valid URL'),
  name: yup.string()
    .trim()
    .required('Name is a required field'),
  description: yup.string()
    .trim()
    .required('Description is a required field'),
  ingredients: yup.array()
    .min(1, ({ min }) => `Ingredients field must have at least ${min} items`)
    .of(ShoppingListSchema)
})
