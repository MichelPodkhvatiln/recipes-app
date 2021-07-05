import { useDispatch } from 'react-redux'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import AuthForm from '../../components/auth-form/auth-form.component'
import { userSignIn } from '../../redux/user/user.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const LoginPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  function onSubmit(data) {
    const { email, password, rememberMe } = data
    dispatch(userSignIn({ email, password, rememberMe }))
  }

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <AuthForm onSubmit={onSubmit} type='login' />
      </Grid>
    </Grid>
  )
}

export default LoginPage
