import PropTypes from 'prop-types'
import { SMALL_IMAGE_PLACEHOLDER } from '../../../constants/placeholders'

import { Card, CardMedia, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  imgPreviewWrap: {
    marginBottom: theme.spacing(3)
  }
}))

const RecipeInfoImagePreview = ({ imageUrl }) => {
  const classes = useStyles()

  const imageSrc = imageUrl.trim().length ? imageUrl : SMALL_IMAGE_PLACEHOLDER

  return (
    <Card className={classes.imgPreviewWrap}>
      <CardMedia
        component='img'
        height='220'
        image={imageSrc}
        title='Recipe Preview Card Image'
        alt='Recipe Preview Card Image'
      />
    </Card>
  )
}

RecipeInfoImagePreview.propTypes = {
  imageUrl: PropTypes.string.isRequired
}

export default RecipeInfoImagePreview
