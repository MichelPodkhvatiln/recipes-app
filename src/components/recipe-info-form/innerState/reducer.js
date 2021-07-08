import RecipeInfoFormTypes from './action.types'

const _updateIngredientValues = (ingredientsList, updatedIngredientData) => {
  const ingredientsListCopy = [...ingredientsList]
  const itemForUpdateIdx = ingredientsList.findIndex((listItem) => listItem.id === updatedIngredientData.ingredientId)

  if (itemForUpdateIdx < 0) return ingredientsListCopy

  const itemForUpdate = ingredientsList[itemForUpdateIdx]

  const updatedItemData = {
    ...itemForUpdate,
    values: {
      ...itemForUpdate.values,
      [updatedIngredientData.name]: updatedIngredientData.value
    }
  }

  ingredientsListCopy.splice(itemForUpdateIdx, 1, updatedItemData)

  return ingredientsListCopy
}

const _validateIngredientValues = (ingredientsList, validatedIngredientData) => {
  const ingredientsListCopy = [...ingredientsList]
  const itemForUpdateIdx = ingredientsList.findIndex((listItem) => listItem.id === validatedIngredientData.ingredientId)

  if (itemForUpdateIdx < 0) return ingredientsListCopy

  const itemForUpdate = ingredientsList[itemForUpdateIdx]

  const updatedItemData = {
    ...itemForUpdate,
    errors: {
      ...itemForUpdate.errors,
      [validatedIngredientData.name]: {
        isValid: validatedIngredientData.value,
        message: validatedIngredientData.message
      }
    }
  }


  ingredientsListCopy.splice(itemForUpdateIdx, 1, updatedItemData)

  return ingredientsListCopy
}

export const RecipeInfoFormInit = (initialState) => {
  return {
    ingredientsList: initialState
  }
}

export const RecipeInfoFormReducer = (state, action) => {
  switch (action.type) {
    case RecipeInfoFormTypes.CREATE_NEW_INGREDIENT:
      return {
        ...state,
        ingredientsList: [...state.ingredientsList, action.payload]
      }
    case RecipeInfoFormTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredientsList: state.ingredientsList.filter((listItem) => listItem.id !== action.payload)
      }
    case RecipeInfoFormTypes.UPDATE_INGREDIENT_VALUES:
      return {
        ...state,
        ingredientsList: _updateIngredientValues(state.ingredientsList, action.payload)
      }
    case RecipeInfoFormTypes.VALIDATE_INGREDIENT_VALUES:
      return {
        ...state,
        ingredientsList: _validateIngredientValues(state.ingredientsList, action.payload)
      }
    default:
      return state
  }
}
