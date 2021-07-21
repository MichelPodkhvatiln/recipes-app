import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generatePath, useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

import { Fab, Grid, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import RecipeCard from '../../components/recipe-card/recipe-card.component'

import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import { resetRecipeCreatedStatus, resetRecipeRemovedStatus } from '../../redux/recipes/recipes.actions'
import {
  selectRecipeCreatedStatus,
  selectRecipeRemovedStatus,
  selectRecipesList
} from '../../redux/recipes/recipes.selectors'

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
  const recipeCreatedStatus = useSelector(selectRecipeCreatedStatus)
  const recipeRemovedStatus = useSelector(selectRecipeRemovedStatus)
  const recipesList = useSelector(selectRecipesList)

  useEffect(() => {
    if (!recipeCreatedStatus) return

    dispatch(resetRecipeCreatedStatus())
  }, [recipeCreatedStatus, dispatch])

  useEffect(() => {
    if (!recipeRemovedStatus) return

    dispatch(resetRecipeRemovedStatus())
  }, [recipeRemovedStatus, dispatch])

  function goToCreateRecipePage() {
    if (!isAuthenticatedUser) return

    history.push(ROUTES.CREATE_RECIPE_PAGE)
  }

  function onCardClickHandler(id) {
    history.push(generatePath(ROUTES.DETAIL_RECIPE_PAGE, { id }))
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
              onClick={onCardClickHandler}
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
