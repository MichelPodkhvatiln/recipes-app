import UserActionsTypes from './user.actions.types'

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isCheckUserSessionProcess: false,
  isAuthUserProcess: false
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.SIGN_IN_START:
    case UserActionsTypes.SIGN_UP_START:
    case UserActionsTypes.SIGN_OUT_START:
      return {
        ...state,
        error: null,
        isAuthUserProcess: true
      }
    case UserActionsTypes.CHECK_USER_SESSION_START:
      return {
        ...state,
        error: null,
        isCheckUserSessionProcess: true
      }
    case UserActionsTypes.SIGN_IN_SUCCESS:
    case UserActionsTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        error: null,
        isAuthUserProcess: false
      }
    case UserActionsTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isAuthUserProcess: false
      }
    case UserActionsTypes.CHECK_USER_SESSION_SUCCESS:
      return {
        ...state,
        error: null,
        isCheckUserSessionProcess: false
      }
    case UserActionsTypes.SIGN_IN_FAILURE:
    case UserActionsTypes.SIGN_UP_FAILURE:
    case UserActionsTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthUserProcess: false
      }
    case UserActionsTypes.CHECK_USER_SESSION_FAILURE:
      return {
        ...state,
        error: action.payload,
        isCheckUserSessionProcess: false
      }
    case UserActionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case UserActionsTypes.RESET_USER_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

export default userReducer
