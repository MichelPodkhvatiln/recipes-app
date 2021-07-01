import * as yup from 'yup'

const AuthFormSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8),
    password_confirm: yup.string().test(
      'passwords-match',
      'Passwords must match',
      (value, { parent }) => value === parent.password)
  }
)

export default AuthFormSchema
