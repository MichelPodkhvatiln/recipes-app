import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthFormSchema from './validationSchema'

import { Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, TextField } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: 600,
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const AuthForm = ({ type, onSubmit }) => {
  const classes = useStyles()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(AuthFormSchema)
  })

  const isLoginMode = type === 'login'
  const isRegistrationMode = type === 'registration'
  const submitBtnText = isLoginMode ? 'Sign In' : 'Sign Up'

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        name='email'
        type='email'
        label='Email Address'
        variant='outlined'
        margin='normal'
        fullWidth
        error={!!errors?.email}
        helperText={!!errors?.email ? errors.email.message : null}
        {...register('email')}
      />

      <TextField
        name='password'
        type='password'
        label='Password'
        variant='outlined'
        margin='normal'
        fullWidth
        error={!!errors?.password}
        helperText={!!errors?.password ? errors.password.message : null}
        {...register('password')}
      />

      {
        isRegistrationMode ?
          <TextField
            name='password_confirm'
            type='password'
            label='Password'
            variant='outlined'
            margin='normal'
            fullWidth
            error={!!errors?.password_confirm}
            helperText={!!errors?.password_confirm ? errors.password_confirm.message : null}
            {...register('password_confirm')}
          />
          : null
      }

      {
        isLoginMode ?
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          :
          null
      }

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
      >
        {submitBtnText}
      </Button>

      <Grid container justify='flex-end'>
        <Grid item>
          <Link component={RouterLink} to={'/registration'}>
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </form>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(['login', 'registration']).isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default AuthForm
