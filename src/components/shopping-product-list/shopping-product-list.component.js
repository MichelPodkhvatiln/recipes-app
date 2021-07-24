import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, makeStyles, Paper } from '@material-ui/core'

import {
  selectEditingListItemId,
  selectShoppingListData
} from '../../redux/modules/shopping-list/shopping-list.selectors'
import { startEditShoppingListItem } from '../../redux/modules/shopping-list/shopping-list.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 600
  },
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
    dispatch(startEditShoppingListItem(listItemId))
  }

  return (
    <Paper className={classes.root}>
      <List>
        {
          shoppingListData.length ?
            shoppingListData.map((listItem) => (
              <ListItem
                key={listItem.id}
                alignItems='center'
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
            <ListItemText
              className={classes.listItemText}
              primary='No data =('
            />
        }
      </List>
    </Paper>
  )
}

export default ShoppingProductList
