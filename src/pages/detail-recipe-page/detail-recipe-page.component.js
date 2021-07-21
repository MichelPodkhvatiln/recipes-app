import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import RecipeInfoImagePreview from '../../components/recipe-info-image-preview/recipe-info-image-preview.component'
import RecipeInfoManageMenu from '../../components/recipe-info-manage-menu/recipe-info-manage-menu.component'
import RecipeInfoIngredientsList
  from '../../components/recipe-info-ingredients-list/recipe-info-ingredients-list.component'

import {
  selectActionRecipeProcess,
  selectCurrentRecipe,
  selectFetchingRecipeProcess,
  selectRecipeRemovedStatus
} from '../../redux/recipes/recipes.selectors'
import { selectCurrentUserId } from '../../redux/user/user.selectors'
import { getRecipe } from '../../redux/recipes/recipes.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  titleText: {
    wordBreak: 'break-word'
  },
  descriptionBlock: {
    marginBottom: theme.spacing(3)
  },
  descriptionText: {
    wordBreak: 'break-word'
  },
  manageRecipeBtnWrap: {
    marginBottom: theme.spacing(2)
  },
  loader: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
}))

const DetailRecipePage = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const recipeDetails = useSelector(selectCurrentRecipe)
  const isFetchingRecipeProcess = useSelector(selectFetchingRecipeProcess)
  const currentUserId = useSelector(selectCurrentUserId)
  const isActionRecipeProcess = useSelector(selectActionRecipeProcess)
  const recipeRemovedStatus = useSelector(selectRecipeRemovedStatus)

  const shownLoader = isFetchingRecipeProcess || isActionRecipeProcess || recipeRemovedStatus

  useEffect(() => {
    if (recipeDetails?.id === id) return

    dispatch(getRecipe(id))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!recipeRemovedStatus) return

    history.push(ROUTES.RECIPES_PAGE)
  }, [recipeRemovedStatus, history])

  if (shownLoader) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    )
  }

  if (!recipeDetails) {
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography component='h1' variant='h5' align='center' gutterBottom>
            Not found
          </Typography>
        </Grid>
      </Grid>
    )
  }

  const { name, description, imageUrl, ingredients, author } = recipeDetails
  const isAllowManageRecipe = currentUserId === author

  return (
    <Grid container className={classes.root}>
      {
        isAllowManageRecipe &&
        <Grid item xs={12}>
          <div className={classes.manageRecipeBtnWrap}>
            <RecipeInfoManageMenu recipeId={id} />
          </div>
        </Grid>
      }

      <Grid item xs={12}>
        <RecipeInfoImagePreview imageUrl={imageUrl} />
      </Grid>

      <Grid item xs={12}>
        <Typography
          className={classes.titleText}
          component='h1'
          variant='h5'
          align='center'
          gutterBottom
        >
          {name}
        </Typography>
      </Grid>

      <Grid className={classes.descriptionBlock} item xs={12}>
        <Typography
          className={classes.descriptionText}
          component='p'
          variant='body1'
          gutterBottom
        >
          {description}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component='h3' variant='overline' align='center'>
          Ingredients list
        </Typography>

        <RecipeInfoIngredientsList ingredients={ingredients} />
      </Grid>
    </Grid>
  )
}

export default DetailRecipePage
