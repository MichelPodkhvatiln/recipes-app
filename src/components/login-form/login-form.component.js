import { Link as RouterLink } from 'react-router-dom'
import { Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    maxWidth: 600,
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const LoginForm = () => {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <form className={classes.form} noValidate>
        <TextField
          name='email'
          type='email'
          label='Email Address'
          variant='outlined'
          margin='normal'
          fullWidth
          required
        />
        <TextField
          name='password'
          type='password'
          label='Password'
          variant='outlined'
          margin='normal'
          fullWidth
          required
        />

        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Sign In
        </Button>

        <Grid container justify='flex-end'>
          <Grid item>
            <Link component={RouterLink} to={'/registration'}>
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default LoginForm
