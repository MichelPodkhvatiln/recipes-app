import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

import { Fab, Grid, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import RecipeCard from '../../components/recipe-card/recipe-card.component'

import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import { beforeCreateRecipePageEnter } from '../../redux/recipes/recipes.actions'
import { selectRecipeCreatedSuccessful } from '../../redux/recipes/recipes.selectors'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column'
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
  const isRecipeCreatedSuccessful = useSelector(selectRecipeCreatedSuccessful)

  useEffect(() => {
    if (!isRecipeCreatedSuccessful) return

    dispatch(beforeCreateRecipePageEnter())
  }, [isRecipeCreatedSuccessful, dispatch])

  function goToCreateRecipePage() {
    if (!isAuthenticatedUser) return

    history.push(ROUTES.CREATE_RECIPE_PAGE)
  }

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
