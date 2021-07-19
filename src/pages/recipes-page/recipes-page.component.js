import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

import { Fab, Grid, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import RecipeCard from '../../components/recipe-card/recipe-card.component'

import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import { resetRecipeCreatedStatus } from '../../redux/recipes/recipes.actions'
import { selectRecipeCreatedSuccessful, selectRecipesList } from '../../redux/recipes/recipes.selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  floatingBtn: {
    position: 'fixed',
    right: 15,
    bottom: 15
  }
}))

const RecipesPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)
  const isRecipeCreatedStatus = useSelector(selectRecipeCreatedSuccessful)
  const recipesList = useSelector(selectRecipesList)

  useEffect(() => {
    if (!isRecipeCreatedStatus) return

    dispatch(resetRecipeCreatedStatus())
  }, [isRecipeCreatedStatus, dispatch])

  function goToCreateRecipePage() {
    if (!isAuthenticatedUser) return

    history.push(ROUTES.CREATE_RECIPE_PAGE)
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Recipes List
        </Typography>
      </Grid>

      {
        !!recipesList.length &&
        recipesList.map((recipeListItem) => (
          <Grid key={recipeListItem.id} item xs={12} sm={6} md={4} lg={3}>
            <RecipeCard
              recipeInfo={recipeListItem}
            />
          </Grid>
        ))
      }

      {
        isAuthenticatedUser &&
        <Fab
          className={classes.floatingBtn}
          color='primary'
          aria-label='Add'
          onClick={goToCreateRecipePage}
        >
          <AddIcon />
        </Fab>
      }
    </Grid>
  )
}

export default RecipesPage
