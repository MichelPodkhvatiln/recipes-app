import { Grid, makeStyles, Typography } from '@material-ui/core'
import RecipeCard from '../../components/recipe-card/recipe-card.component'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  }
}))

const RecipesPage = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Recipes List
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <RecipeCard title='Test card' description='lorem asd asdasd asdsad ads asd' />
      </Grid>
    </Grid>
  )
}

export default RecipesPage
