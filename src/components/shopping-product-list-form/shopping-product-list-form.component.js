import { Button, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: theme.spacing(1),
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(0.5)
    }
  }
}))

const ShoppingProductListForm = () => {
  const classes = useStyles()

  return (
    <form className={classes.form} noValidate autoComplete='off'>
      <TextField label='Name' variant='outlined' size='small' />
      <TextField type='number' label='Amount' variant='outlined' size='small' />

      <div className={classes.buttonGroup}>
        <Button variant='outlined' color='primary'>Add</Button>
        {/*<Button variant='outlined' color='secondary'>Remove</Button>*/}
        <Button variant='outlined'>Clear</Button>
      </div>
    </form>
  )
}

export default ShoppingProductListForm
