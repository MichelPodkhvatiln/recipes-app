import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Grid, makeStyles, Typography } from '@material-ui/core'
import RecipeEditForm from '../../components/recipe-edit-form/recipe-edit-form.component'

import { selectRecipeItemById, selectRecipeUpdatedStatus } from '../../redux/recipes/recipes.selectors'
import { resetRecipeUpdatedStatus } from '../../redux/recipes/recipes.actions'

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
  const dispatch = useDispatch()
  const recipeDetails = useSelector(selectRecipeItemById(id))
  const isRecipeUpdatedStatus = useSelector(selectRecipeUpdatedStatus)

  useEffect(() => {
    if (!isRecipeUpdatedStatus) return

    dispatch(resetRecipeUpdatedStatus())
  }, [isRecipeUpdatedStatus])

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
