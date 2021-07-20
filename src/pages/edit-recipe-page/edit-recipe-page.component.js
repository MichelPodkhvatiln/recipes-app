import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Grid, makeStyles, Typography } from '@material-ui/core'
import RecipeEditForm from '../../components/recipe-edit-form/recipe-edit-form.component'

import { selectRecipeItemById } from '../../redux/recipes/recipes.selectors'
import { selectCurrentUserId } from '../../redux/user/user.selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  }
}))

const EditRecipePage = () => {
  const classes = useStyles()
  const { id } = useParams()
  const recipeDetails = useSelector(selectRecipeItemById(id))
  const currentUserId = useSelector(selectCurrentUserId)

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Edit recipe
        </Typography>
      </Grid>


      <Grid item xs={12}>
        <RecipeEditForm recipeData={recipeDetails} />
      </Grid>
    </Grid>
  )
}

export default EditRecipePage
