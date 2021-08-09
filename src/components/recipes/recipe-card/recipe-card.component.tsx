import { FC } from 'react'
import { SMALL_IMAGE_PLACEHOLDER } from '../../../constants/placeholders'

import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'

import { IRecipeData } from '../../../interfaces'

interface IRecipeCardProps {
  recipeInfo: IRecipeData,
  onClick: (id: string) => void
}

const useStyles = makeStyles(() => ({
  textClip: {
    '&.MuiTypography-root': {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }
}))

export const RecipeCard: FC<IRecipeCardProps> = ({ recipeInfo, onClick }) => {
  const classes = useStyles()
  const { id, name, description, imageUrl } = recipeInfo

  function onCardClickHandler(): void {
    onClick(id)
  }

  return (
    <Card>
      <CardActionArea onClick={onCardClickHandler}>
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
