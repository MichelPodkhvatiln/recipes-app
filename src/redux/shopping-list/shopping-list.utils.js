export function removeShoppingListItem(listData, removeListItemId) {
  return listData.filter((listItem) => listItem.id !== removeListItemId)
}

export function updateShoppingListItem(listData, editingItemId, updatedListItemData) {
  const listDataCopy = [...listData]

  const editingItemIndex = listDataCopy.findIndex((listItem) => listItem.id === editingItemId)

  if (editingItemIndex < 0) return listDataCopy

  const updatedListItem = {
    ...updatedListItemData,
    id: editingItemId
  }

  listDataCopy.splice(editingItemIndex, 1, updatedListItem)

  return listDataCopy
}
