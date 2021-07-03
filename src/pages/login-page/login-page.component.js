import { Grid, makeStyles, Typography } from '@material-ui/core'
import AuthForm from '../../components/auth-form/auth-form.component'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const LoginPage = () => {
  const classes = useStyles()

  function onSubmit(data) {
    console.log('login action', data)
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
