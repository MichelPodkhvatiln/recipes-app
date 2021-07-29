import * as yup from 'yup'

const baseValidationSchema = {
  email: yup.string()
    .trim()
    .email('Email must be a valid email')
    .required('Email is a required field'),
  password: yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is a required field')
}

export const LoginFormSchema = yup.object().shape(baseValidationSchema)

export const RegistrationFormSchema = yup.object().shape({
  ...baseValidationSchema,
  passwordConfirm: yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is a required field')
    .test(
      'passwordConfirm',
      'Passwords must match',
      (value, { parent }) => value === parent.password
    )
})
