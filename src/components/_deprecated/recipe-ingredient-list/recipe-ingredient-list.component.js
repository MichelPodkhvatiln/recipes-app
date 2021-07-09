import PropTypes from 'prop-types'
import { List, ListItem } from '@material-ui/core'

const RecipeIngredientList = ({ ingredientsList }) => {

  if (!ingredientsList.length) return null

  return (
    <List>
      {
        ingredientsList.map((listItem) => (
          <ListItem key={listItem.id}>
            <p>{listItem.name}</p>
            <p>{listItem.amount}</p>
          </ListItem>
        ))
      }
    </List>
  )
}

RecipeIngredientList.propTypes = {
  ingredientsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }))
}

export default RecipeIngredientList
