export function getEditingItemData(listData, editingListItemId) {
  const editingItem = listData.find((listItem) => listItem.id === editingListItemId)

  if (!editingItem) return null

  return editingItem
}

export function removeShoppingListItem(listData, removeListItemId) {
  return listData.filter((listItem) => listItem.id !== removeListItemId)
}

export function updateShoppingListItem(listData, editingItem, updatedListItemData) {
  const listDataCopy = [...listData]

  const editingItemIndex = listDataCopy.findIndex((listItem) => listItem.id === editingItem.id)

  if (editingItemIndex < 0) return listDataCopy

  const updatedListItem = {
    ...updatedListItemData,
    id: editingItem.id
  }

  listDataCopy.splice(editingItemIndex, 1, updatedListItem)

  return listDataCopy
}
