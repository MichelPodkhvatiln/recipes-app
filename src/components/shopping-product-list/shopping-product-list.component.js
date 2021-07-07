import { selectEditingListItemId, selectShoppingListData } from '../../redux/shopping-list/shopping-list.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, makeStyles, Paper } from '@material-ui/core'
import { editShoppingListItem } from '../../redux/shopping-list/shopping-list.actions'

const useStyles = makeStyles(() => ({
  listItemText: {
    textAlign: 'center'
  }
}))

const ShoppingProductList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const editingListItemId = useSelector(selectEditingListItemId)
  const shoppingListData = useSelector(selectShoppingListData)

  function onListItemClick(listItemId) {
    dispatch(editShoppingListItem(listItemId))
  }

  return (
    <Paper>
      <List>
        {
          shoppingListData.length ?
            shoppingListData.map((listItem) => (
              <ListItem
                key={listItem.id}
                button
                selected={editingListItemId === listItem.id}
                onClick={() => onListItemClick(listItem.id)}
              >
                <ListItemText
                  className={classes.listItemText}
                  primary={`${listItem.name} (${listItem.amount})`}
                />
              </ListItem>
            ))
            :
            <ListItemText className={classes.listItemText} primary='No data =(' />
        }
      </List>
    </Paper>
  )
}

export default ShoppingProductList
