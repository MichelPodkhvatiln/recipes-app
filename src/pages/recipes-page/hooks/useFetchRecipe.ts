import { useReducer } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useUnwrapAsyncThunk } from '../../../hooks'

import { FirebaseDocumentData, FirebaseQueryDocumentSnapshot, IRecipeData } from '../../../interfaces'

import { fetchRecipesListWithPaging, resetRecipesList } from '../../../redux/modules/recipes/recipes.actions'
import { selectRecipesList } from '../../../redux/modules/recipes/recipes.selectors'

enum HookActions {
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_FAILURE = 'FETCH_FAILURE'
}

interface IHookState {
  loading: boolean,
  error: null | any,
  hasNextPage: boolean,
  lastDoc: null | FirebaseQueryDocumentSnapshot<FirebaseDocumentData>
}

interface IHookAction {
  type: HookActions,
  payload?: any
}

interface IUseFetchRecipe {
  recipesList: IRecipeData[],
  hasNextPage: boolean,
  loading: boolean,
  error: null | any,
  getData: () => Promise<void>,
  resetData: () => void
}

const initialState: IHookState = {
  loading: false,
  error: null,
  hasNextPage: false,
  lastDoc: null
}

function init(initialState: IHookState): IHookState {
  return { ...initialState }
}

function reducer(state: IHookState, action: IHookAction): IHookState {
  switch (action.type) {
    case HookActions.FETCH_START:
      return {
        ...state,
        loading: true
      }
    case HookActions.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        hasNextPage: action.payload.hasNextPage,
        lastDoc: action.payload.lastQueryDoc
      }
    case HookActions.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      throw new Error()
  }
}

export default function useFetchRecipe(limit = 10): IUseFetchRecipe {
  const [state, dispatch] = useReducer(reducer, initialState, init)

  const reduxDispatch = useAppDispatch()
  const reduxThunkDispatch = useUnwrapAsyncThunk()
  const recipesList = useSelector(selectRecipesList)

  async function getData(): Promise<void> {
    try {
      const { lastDoc } = state

      dispatch({ type: HookActions.FETCH_START })

      const { hasNextPage, lastQueryDoc } = await reduxThunkDispatch(fetchRecipesListWithPaging({
        limit,
        lastQueryDoc: lastDoc
      }))

      dispatch({
        type: HookActions.FETCH_SUCCESS,
        payload: {
          hasNextPage,
          lastQueryDoc
        }
      })
    } catch (err) {
      dispatch({ type: HookActions.FETCH_FAILURE, payload: err })
    }
  }

  function resetData(): void {
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
  } as const
}
