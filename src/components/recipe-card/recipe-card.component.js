import PropTypes from 'prop-types'
import { RECIPE_DOC_PROPS } from '../../constants/propTypes'

import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  textClip: {
    '&.MuiTypography-root': {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }
}))

const RecipeCard = ({ recipeInfo, onClick }) => {
  const classes = useStyles()
  const { id, name, description, imageUrl } = recipeInfo

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia
          component='img'
          height='160'
          image={imageUrl || 'https://via.placeholder.com/300?text=No+Preview'}
          title='Recipe Card Image'
          alt='Recipe Card Image'
        />
        <CardContent>
          <Typography
            className={classes.textClip}
            gutterBottom
            variant='h5'
            component='h2'
          >
            {name}
          </Typography>
          <Typography
            className={classes.textClip}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

RecipeCard.propTypes = {
  recipeInfo: PropTypes.shape(RECIPE_DOC_PROPS).isRequired,
  onClick: PropTypes.func.isRequired
}

export default RecipeCard
