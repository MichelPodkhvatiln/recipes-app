import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Card, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'

import { selectRecipeItemById } from '../../redux/recipes/recipes.selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4)
  },
  imgPreviewWrap: {
    marginBottom: theme.spacing(3)
  },
  titleText: {
    wordBreak: 'break-word'
  },
  descriptionText: {
    wordBreak: 'break-word'
  }
}))

const DetailRecipePage = () => {
  const classes = useStyles()
  const { id } = useParams()
  const recipeDetails = useSelector(selectRecipeItemById(id))

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


  const { name, description, imageUrl } = recipeDetails

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Card className={classes.imgPreviewWrap}>
          <CardMedia
            component='img'
            height='220'
            image={imageUrl || 'https://via.placeholder.com/300?text=No+Preview'}
            title='Recipe Card Image'
            alt='Recipe Card Image'
          />
        </Card>
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

      <Grid item xs={12}>
        <Typography
          className={classes.descriptionText}
          component='p'
          variant='body1'
        >
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default DetailRecipePage
