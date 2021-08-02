import { FC } from 'react'
import { useSelector } from 'react-redux'

import { Grid, makeStyles, Typography } from '@material-ui/core'
import RecipeEditForm from '../../components/recipes/forms/recipe-edit-form/recipe-edit-form.component'

import { selectCurrentRecipe } from '../../redux/modules/recipes/recipes.selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
  }
}))

const EditRecipePage: FC = () => {
  const classes = useStyles()
  const recipeDetails = useSelector(selectCurrentRecipe)

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Edit recipe
        </Typography>
      </Grid>

      {
        recipeDetails && (
          <Grid item xs={12}>
            <RecipeEditForm recipeData={recipeDetails} />
          </Grid>
        )
      }
    </Grid>
  )
}

export default EditRecipePage
