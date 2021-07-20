import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import {
  selectRecipeItemById,
  selectRecipeRemovedStatus,
  selectRemoveRecipeProcess
} from '../../redux/recipes/recipes.selectors'
import RecipeInfoImagePreview from '../../components/recipe-info-image-preview/recipe-info-image-preview.component'
import RecipeInfoManageMenu from '../../components/recipe-info-manage-menu/recipe-info-manage-menu.component'
import { selectCurrentUserId } from '../../redux/user/user.selectors'
import { useEffect } from 'react'
import { ROUTES } from '../../constants/routes'

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
  ingredientText: {
    wordBreak: 'break-word'
  },
  manageRecipeBtnWrap: {
    marginBottom: theme.spacing(2)
  },
  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%'
  }
}))

const DetailRecipePage = () => {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const recipeDetails = useSelector(selectRecipeItemById(id))
  const currentUserId = useSelector(selectCurrentUserId)
  const isRemoveRecipeProcess = useSelector(selectRemoveRecipeProcess)
  const recipeRemovedStatus = useSelector(selectRecipeRemovedStatus)

  useEffect(() => {
    if (!recipeRemovedStatus) return

    history.push(ROUTES.RECIPES_PAGE)
  }, [recipeRemovedStatus, history])

  if (isRemoveRecipeProcess) {
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

        <List dense>
          {
            !!ingredients.length &&
            ingredients.map((ingredientItem, idx) => (
              <ListItem key={idx}>
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.ingredientText}
                  primary={`${ingredientItem.name} - ${ingredientItem.amount}`}
                />
              </ListItem>
            ))
          }
        </List>
      </Grid>
    </Grid>
  )
}

export default DetailRecipePage
