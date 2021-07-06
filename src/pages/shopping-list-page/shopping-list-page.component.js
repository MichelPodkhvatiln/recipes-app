import { Grid, makeStyles, Typography } from '@material-ui/core'
import ShoppingProductList from '../../components/shopping-product-list/shopping-product-list.component'
import ShoppingProductListFormContainer
  from '../../containers/shopping-product-list-form/shopping-product-list-form.container'

const useStyles = makeStyles((theme) => ({
  pageWrap: {
    marginTop: theme.spacing(4)
  }
}))

const ShoppingListPage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.pageWrap}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Shopping List
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <ShoppingProductListFormContainer />
      </Grid>

      <Grid item xs={12}>
        <ShoppingProductList />
      </Grid>
    </Grid>
  )
}

export default ShoppingListPage
