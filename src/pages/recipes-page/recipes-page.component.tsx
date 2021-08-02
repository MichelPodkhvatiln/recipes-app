import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { generatePath, useHistory } from 'react-router-dom'
import useFetchRecipe from './hooks/useFetchRecipe'
import { ROUTES } from '../../constants/routes'

import { Fab, Grid, makeStyles, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RecipesList from '../../components/recipes/recipes-list/recipes-list.component'

import { selectIsAuthenticatedUser } from '../../redux/modules/user/user.selectors'

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

const PAGINATION_LIMIT = 10

const RecipesPage: FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const isAuthenticatedUser = useSelector(selectIsAuthenticatedUser)

  const {
    recipesList,
    hasNextPage,
    loading,
    getData,
    resetData
  } = useFetchRecipe(PAGINATION_LIMIT)

  useEffect(() => {
    getData()

    return () => {
      resetData()
    }
    // eslint-disable-next-line
  }, [])

  function goToCreateRecipePage(): void {
    if (!isAuthenticatedUser) return

    history.push(ROUTES.RECIPES_ROUTES.CREATE_RECIPE_PAGE)
  }

  function onCardClick(id: string): void {
    history.push(generatePath(ROUTES.RECIPES_ROUTES.DETAIL_RECIPE_PAGE, { id }))
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
        onLoadMore={getData}
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
