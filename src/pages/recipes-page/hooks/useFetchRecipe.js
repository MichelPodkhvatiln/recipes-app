import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchRecipesListWithPaging, resetRecipesList } from '../../../redux/modules/recipes/recipes.actions'
import { selectRecipesList } from '../../../redux/modules/recipes/recipes.selectors'

//State
const INITIAL_STATE = {
  loading: false,
  error: null,
  hasNextPage: false,
  lastDoc: null
}

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE'
}

function init(initialState) {
  return { ...initialState }
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        loading: true
      }
    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        hasNextPage: action.payload.hasNextPage,
        lastDoc: action.payload.lastQueryDoc
      }
    case ACTIONS.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      throw new Error()
  }
}

export default function useFetchRecipe(limit = 10) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, init)

  const reduxDispatch = useDispatch()
  const recipesList = useSelector(selectRecipesList)

  async function getData() {
    try {
      const { lastDoc } = state

      dispatch({ type: ACTIONS.FETCH_START })

      const { payload: { hasNextPage, lastQueryDoc } } = await reduxDispatch(fetchRecipesListWithPaging({
        limit,
        lastQueryDoc: lastDoc
      }))

      dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        payload: {
          hasNextPage,
          lastQueryDoc
        }
      })
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_FAILURE, payload: err })
    }
  }

  function resetData() {
    reduxDispatch(resetRecipesList())
  }

  const { hasNextPage, loading, error } = state

  return {
    recipesList,
    hasNextPage,
    loading,
    error,
    getData,
    resetData
  }
}
