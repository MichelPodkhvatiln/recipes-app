import { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema, RegistrationFormSchema } from '../../validationSchemas'
import { ROUTES } from '../../constants/routes'

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

import { signIn, signUp } from '../../redux/modules/user/user.actions'

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

const AuthForm = ({ type }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: false,
    error: null
  })

  const isLoginMode = type === 'login'

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(isLoginMode ? LoginFormSchema : RegistrationFormSchema)
  })

  function changeFormMode(path) {
    reset()
    history.push(path)
  }

  async function onSubmit(data) {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }))

      if (isLoginMode) {
        await dispatch(signIn(data)).unwrap()
        history.push(ROUTES.RECIPES_PAGE)
        return
      }

      await dispatch(signUp(data)).unwrap()
      history.push(ROUTES.RECIPES_PAGE)
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: err
      }))
    }
  }

  const modeContent = {
    submitBtnText: isLoginMode ? 'Sign In' : 'Sign Up',
    formLinkToPath: isLoginMode ? ROUTES.REGISTRATION_PAGE : ROUTES.LOGIN_PAGE,
    formLinkText: isLoginMode ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign in'
  }
  const { loading, error } = state

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        render={({ field, fieldState }) => (
          <TextField
            type='email'
            label='Email Address'
            variant='outlined'
            margin='dense'
            fullWidth
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            disabled={loading}
            {...field}
          />
        )}
        name='email'
        defaultValue=''
        control={control}
      />

      <Controller
        render={({ field, fieldState }) => (
          <TextField
            type='password'
            label='Password'
            variant='outlined'
            margin='dense'
            fullWidth
            error={!!fieldState.error}
            helperText={!!fieldState.error && fieldState.error.message}
            disabled={loading}
            {...field}
          />
        )}
        name='password'
        defaultValue=''
        control={control}
      />

      {
        !isLoginMode &&
        <Controller
          render={({ field, fieldState }) => (
            <TextField
              type='password'
              label='Confirm password'
              variant='outlined'
              margin='dense'
              fullWidth
              error={!!fieldState.error}
              helperText={!!fieldState.error && fieldState.error.message}
              disabled={loading}
              {...field}
            />
          )}
          name='passwordConfirm'
          defaultValue=''
          control={control}
        />
      }

      <FormControlLabel
        label='Remember me'
        control={
          <Controller
            render={({ field }) => (
              <Checkbox
                color='primary'
                disabled={loading}
                {...field}
              />
            )}
            name='rememberMe'
            defaultValue={false}
            control={control}
          />
        }
      />

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        disabled={loading}
      >
        {
          loading ?
            <CircularProgress color='inherit' size={24} />
            :
            modeContent.submitBtnText
        }
      </Button>

      {
        error &&
        <FormHelperText error className={classes.errorText}>
          {error.message}
        </FormHelperText>
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
  type: PropTypes.oneOf(['login', 'registration']).isRequired
}

export default AuthForm
