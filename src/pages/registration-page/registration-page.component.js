import { useDispatch } from 'react-redux'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import AuthForm from '../../components/auth-form/auth-form.component'
import { userSignUp } from '../../redux/user/user.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const RegistrationPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  function onSubmit(data) {
    const { email, password, rememberMe } = data
    dispatch(userSignUp({ email, password, rememberMe }))
  }

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
      </Grid>
      <Grid item>
        <AuthForm onSubmit={onSubmit} type='registration' />
      </Grid>
    </Grid>
  )
}

export default RegistrationPage
