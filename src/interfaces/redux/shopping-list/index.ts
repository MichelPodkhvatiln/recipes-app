export interface IShoppingListItem {
  id: string,
  name: string,
  amount: string | number,
}

export type IShoppingListFormData = Omit<IShoppingListItem, 'id'>

export interface IShoppingListState {
  list: IShoppingListItem[],
  editingItemId: null | string
}
