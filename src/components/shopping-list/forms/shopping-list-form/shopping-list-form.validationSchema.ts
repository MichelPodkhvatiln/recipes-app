import * as yup from 'yup'

export const ShoppingListSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .required('Name is a required field'),
  amount: yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be a positive number')
    .integer()
    .required('Amount is a required field')
})
