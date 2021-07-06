import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema, RegistrationFormSchema } from '../../validationSchemas'
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  makeStyles,
  TextField
} from '@material-ui/core'

import { selectAuthUserProcess, selectUserProcessError } from '../../redux/user/user.selectors'
import { resetUserErrors } from '../../redux/user/user.actions'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: 600,
    marginTop: theme.spacing(1)
  },
  errorText: {
    margin: theme.spacing(1, 0),
    textAlign: 'center',
    fontSize: theme.typography.htmlFontSize
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const AuthForm = ({ type, onSubmit }) => {
  const isLoginMode = type === 'login'
  const isRegistrationMode = type === 'registration'

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuthUserProcess = useSelector(selectAuthUserProcess)
  const userProcessError = useSelector(selectUserProcessError)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(isLoginMode ? LoginFormSchema : RegistrationFormSchema)
  })

  useEffect(() => {
    if (!isAuthUserProcess && isSubmitSuccessful && !userProcessError) {
      reset()
      history.push('/')
    }
  }, [isSubmitSuccessful, isAuthUserProcess, userProcessError, reset, history])

  function changeFormMode(path) {
    dispatch(resetUserErrors())
    reset()
    history.push(path)
  }

  const modeContent = {
    submitBtnText: isLoginMode ? 'Sign In' : 'Sign Up',
    formLinkToPath: isLoginMode ? '/registration' : '/login',
    formLinkText: isLoginMode ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign in'
  }

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
        margin='dense'
        fullWidth
        error={!!errors?.email}
        helperText={!!errors?.email ? errors.email.message : null}
        disabled={isAuthUserProcess}
        {...register('email')}
      />

      <TextField
        name='password'
        type='password'
        label='Password'
        variant='outlined'
        margin='dense'
        fullWidth
        error={!!errors?.password}
        helperText={!!errors?.password ? errors.password.message : null}
        disabled={isAuthUserProcess}
        {...register('password')}
      />

      {
        isRegistrationMode ?
          <TextField
            name='password_confirm'
            type='password'
            label='Confirm password'
            variant='outlined'
            margin='dense'
            fullWidth
            error={!!errors?.password_confirm}
            helperText={!!errors?.password_confirm ? errors.password_confirm.message : null}
            disabled={isAuthUserProcess}
            {...register('password_confirm')}
          />
          : null
      }

      <FormControlLabel
        control={<Checkbox color='primary' />}
        label='Remember me'
        disabled={isAuthUserProcess}
        {...register('rememberMe', { value: false })}
        onChange={(e) =>
          setValue('rememberMe', e.target.checked)
        }
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={isAuthUserProcess}
      >
        {
          isAuthUserProcess ?
            <CircularProgress color='inherit' size={24} />
            :
            modeContent.submitBtnText
        }
      </Button>

      {
        userProcessError ?
          <FormHelperText error className={classes.errorText}>
            {userProcessError.message}
          </FormHelperText>
          : null
      }

      <Grid container justify='flex-end'>
        <Grid item>
          <Link
            component='button'
            onClick={() => changeFormMode(modeContent.formLinkToPath)}
          >
            {modeContent.formLinkText}
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
