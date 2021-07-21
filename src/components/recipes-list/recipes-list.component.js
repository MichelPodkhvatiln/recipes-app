import { Grid } from '@material-ui/core'
import RecipeCard from '../recipe-card/recipe-card.component'
import useInfiniteScroll from 'react-infinite-scroll-hook'

const RecipesList = (props) => {
  const { recipesList, loading, hasNextPage, onLoadMore, onCardClick } = props

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
        <Grid item xs={12} ref={sentryRef}>
          Loading...
        </Grid>
      }
    </>
  )
}

export default RecipesList
