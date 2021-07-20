import PropTypes from 'prop-types'
import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const useStyles = makeStyles(() => ({
  ingredientText: {
    wordBreak: 'break-word'
  }
}))

const RecipeInfoIngredientsList = ({ ingredients }) => {
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

RecipeInfoIngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }))
}

export default RecipeInfoIngredientsList
