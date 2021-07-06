import * as yup from 'yup'

const baseValidationSchema = {
  email: yup.string()
    .email('Email must be a valid email')
    .required('Email is a required field'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is a required field')
}

export const LoginFormSchema = yup.object().shape(baseValidationSchema)
export const RegistrationFormSchema = yup.object().shape({
  ...baseValidationSchema,
  password_confirm: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is a required field')
    .test(
      'password_confirm',
      'Passwords must match',
      (value, { parent }) => value === parent.password
    )
})

export const ShoppingListSchema = yup.object().shape({
  name: yup.string()
    .required('Name is a required field'),
  amount: yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be a positive number')
    .integer()
    .required('Amount is a required field')
})
