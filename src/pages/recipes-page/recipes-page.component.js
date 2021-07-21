import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generatePath, useHistory } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useRecipesFetch } from './hooks/useRecipesFetch'
import { useRecipesPageRedirect } from './hooks/useRecipesPageRedirect'

import { Fab, Grid, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RecipesList from '../../components/recipes-list/recipes-list.component'

import { selectIsAuthenticatedUser } from '../../redux/user/user.selectors'
import { getRecipeListWithPaging, resetRecipePagePaginationData } from '../../redux/recipes/recipes.actions'

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

const PAGINATION_LIMIT = 2

const RecipesPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  const {
    recipesList,
    lastRecipeDoc,
    loading,
    hasNextPage
  } = useRecipesFetch()

  useRecipesPageRedirect()

  useEffect(() => {
    loadRecipes()

    return () => {
      dispatch(resetRecipePagePaginationData())
    }
    // eslint-disable-next-line
  }, [])

  function goToCreateRecipePage() {
    if (!isAuthenticatedUser) return

    history.push(ROUTES.CREATE_RECIPE_PAGE)
  }

  function onCardClick(id) {
    history.push(generatePath(ROUTES.DETAIL_RECIPE_PAGE, { id }))
  }

  function loadRecipes() {
    dispatch(getRecipeListWithPaging(PAGINATION_LIMIT, lastRecipeDoc))
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography component='h1' variant='h5' align='center' gutterBottom>
          Recipes List
        </Typography>
      </Grid>

      <RecipesList
        recipesList={recipesList}
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={loadRecipes}
        onCardClick={onCardClick}
      />

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
