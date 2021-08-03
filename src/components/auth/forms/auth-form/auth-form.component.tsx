import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useComponentLoading, useUnwrapAsyncThunk } from '../../../../hooks'
import { APP_ROUTES } from '../../../../constants/routes'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormSchema, RegistrationFormSchema } from './auth-form.validationSchema'

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

import { signIn, signUp } from '../../../../redux/modules/user/user.actions'
import { IAuthFormData } from '../../../../interfaces'

type AuthFormTypes = 'login' | 'registration'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    maxWidth: 600,
    marginTop: theme.spacing(1)
  },
  errorText: {
    margin: theme.spacing(1, 0),
    textAlign: 'center',
    fontSize: theme.typography.body1.fontSize
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const AuthForm: FC<{ type: AuthFormTypes }> = ({ type }) => {
  const isLoginMode = type === 'login'

  const classes = useStyles()
  const history = useHistory()
  const dispatch = useUnwrapAsyncThunk()
  const {
    loading,
    error,
    startLoading,
    onLoadingError
  } = useComponentLoading()

  const { handleSubmit, control, reset } = useForm({
    resolver: yupResolver(isLoginMode ? LoginFormSchema : RegistrationFormSchema)
  })

  function changeFormMode(path: string): void {
    reset()
    history.push(path)
  }

  async function onSubmit(data: IAuthFormData): Promise<void> {
    try {
      startLoading()

      if (isLoginMode) {
        await dispatch(signIn(data))
        history.push(APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE())
        return
      }

      await dispatch(signUp(data))
      history.push(APP_ROUTES.RECIPES_ROUTES.RECIPES_PAGE())
    } catch (err) {
      onLoadingError(err)
    }
  }

  const modeContent = {
    submitBtnText: isLoginMode ? 'Sign In' : 'Sign Up',
    formLinkToPath: isLoginMode ? APP_ROUTES.AUTH_ROUTES.REGISTRATION_PAGE() : APP_ROUTES.AUTH_ROUTES.LOGIN_PAGE(),
    formLinkText: isLoginMode ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign in'
  }

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
