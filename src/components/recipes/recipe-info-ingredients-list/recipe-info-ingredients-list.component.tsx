import { FC } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { IRecipeIngredients } from '../../../interfaces'

interface IRecipeInfoIngredientsListProps {
  ingredients: IRecipeIngredients[]
}

const useStyles = makeStyles(() => ({
  ingredientText: {
    wordBreak: 'break-word'
  }
}))

export const RecipeInfoIngredientsList: FC<IRecipeInfoIngredientsListProps> = ({ ingredients }) => {
  const classes = useStyles()

  return (
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
  )
}
