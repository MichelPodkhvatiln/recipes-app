import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { List, ListItem, ListItemText, makeStyles, Paper } from '@material-ui/core'

import {
  selectEditingListItemId,
  selectShoppingListData,
  selectShoppingListItemById
} from '../../../redux/modules/shopping-list/shopping-list.selectors'
import { startEditShoppingListItem } from '../../../redux/modules/shopping-list/shopping-list.actions'

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 600
  },
  listItemText: {
    textAlign: 'center'
  }
}))

export const ShoppingProductList: FC = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const editingListItemId = useAppSelector(selectEditingListItemId)
  const editingListItemData = useAppSelector(selectShoppingListItemById(editingListItemId))
  const shoppingListData = useAppSelector(selectShoppingListData)

  function onListItemClick(listItemId: string): void {
    dispatch(startEditShoppingListItem(listItemId))
  }

  function isSelectedListItem(id: string): boolean {
    return !!editingListItemData && editingListItemId === id
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
                selected={isSelectedListItem(listItem.id)}
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
