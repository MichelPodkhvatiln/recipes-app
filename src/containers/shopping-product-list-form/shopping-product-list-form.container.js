import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ShoppingProductListForm from '../../components/shopping-product-list-form/shopping-product-list-form.component'
import { addShoppingListItem, updateShoppingListItem } from '../../redux/shopping-list/shopping-list.actions'
import { selectEditingListItem } from '../../redux/shopping-list/shopping-list.selectors'

const ShoppingProductListFormContainer = () => {
  const dispatch = useDispatch()
  const editingListItem = useSelector(selectEditingListItem)

  function onFormSubmit(formData) {
    if (editingListItem) {
      dispatch(updateShoppingListItem(formData))
      return
    }

    dispatch(addShoppingListItem({
      ...formData,
      id: uuidv4()
    }))
  }

  return (
    <>
      <ShoppingProductListForm onSubmit={onFormSubmit} />
    </>
  )
}

export default ShoppingProductListFormContainer
