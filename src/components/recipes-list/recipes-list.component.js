import { CircularProgress, Grid, makeStyles } from '@material-ui/core'
import RecipeCard from '../recipe-card/recipe-card.component'
import useInfiniteScroll from 'react-infinite-scroll-hook'

const useStyles = makeStyles(() => ({
  loaderWrap: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const RecipesList = (props) => {
  const { recipesList, loading, hasNextPage, onLoadMore, onCardClick } = props

  const classes = useStyles()
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    disabled: false,
    rootMargin: '0px 0px 400px 0px'
  })

  return (
    <>
      {
        !!recipesList.length &&
        recipesList.map((recipeListItem) => (
          <Grid key={recipeListItem.id} item xs={12} sm={6} md={4} lg={3}>
            <RecipeCard
              recipeInfo={recipeListItem}
              onClick={onCardClick}
            />
          </Grid>
        ))
      }

      {
        (loading || hasNextPage) &&
        <Grid
          item
          ref={sentryRef}
          xs={12}
          className={classes.loaderWrap}
        >
          <CircularProgress size={24} />
        </Grid>
      }
    </>
  )
}

export default RecipesList
