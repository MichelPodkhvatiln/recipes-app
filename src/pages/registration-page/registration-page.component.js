import { Grid, makeStyles, Typography } from '@material-ui/core'
import AuthForm, { AuthFormTypes } from '../../components/auth/forms/auth-form/auth-form.component'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const RegistrationPage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
      </Grid>

      <Grid item>
        <AuthForm type={AuthFormTypes.REGISTRATION} />
      </Grid>
    </Grid>
  )
}

export default RegistrationPage
