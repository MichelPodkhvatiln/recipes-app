import PropTypes from 'prop-types'
import { RECIPE_DOC_PROPS } from '../../constants/propTypes'
import { SMALL_IMAGE_PLACEHOLDER } from '../../constants/placeholders'

import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
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
    <Card>
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia
          component='img'
          height='160'
          image={imageUrl || SMALL_IMAGE_PLACEHOLDER}
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
