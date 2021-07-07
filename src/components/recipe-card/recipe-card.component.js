import PropTypes from 'prop-types'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'

const RecipeCard = ({ title, description, imgURL }) => {
  return (
    <Card>
      <CardActionArea onClick={()=>{
        console.log('click')
      }}>
        <CardMedia
          component='img'
          height='160'
          image={imgURL || 'https://via.placeholder.com/300?text=No+Image'}
          title='Recipe Card Image'
          alt='Recipe Card Image'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgURL: PropTypes.string
}

export default RecipeCard
