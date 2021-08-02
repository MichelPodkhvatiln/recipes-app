import { useReducer } from 'react'

enum HookActions {
  ON_START = 'ON_START',
  ON_SUCCESS = 'ON_SUCCESS',
  ON_FAILURE = 'ON_FAILURE'
}

interface IHookState {
  loading: boolean,
  error: null | any,
}

interface IHookAction {
  type: HookActions,
  payload?: any
}

const initialState: IHookState = {
  loading: false,
  error: null
}

function init(initialState: IHookState): IHookState {
  return { ...initialState }
}

function reducer(state: IHookState, action: IHookAction): IHookState {
  switch (action.type) {
    case HookActions.ON_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case HookActions.ON_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case HookActions.ON_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      throw new Error()
  }
}

export function useComponentLoading() {
  const [state, dispatch] = useReducer(reducer, initialState, init)

  function startLoading(): void {
    dispatch({ type: HookActions.ON_START })
  }

  function stopLoading(): void {
    dispatch({ type: HookActions.ON_SUCCESS })
  }

  function onLoadingError(error: any): void {
    dispatch({
      type: HookActions.ON_FAILURE,
      payload: error
    })
  }

  const { loading, error } = state

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    onLoadingError
  }
}
