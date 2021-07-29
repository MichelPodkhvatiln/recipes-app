import { Grid, makeStyles, Typography } from '@material-ui/core'
import ShoppingProductList from '../../components/shopping-list/shopping-product-list/shopping-product-list.component'
import ShoppingListForm from '../../components/shopping-list/forms/shopping-list-form/shopping-list-form.component'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  }
}))

const ShoppingListPage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Shopping List
        </Typography>
      </Grid>

      <Grid item>
        <ShoppingListForm />
      </Grid>

      <Grid item>
        <ShoppingProductList />
      </Grid>
    </Grid>
  )
}

export default ShoppingListPage
