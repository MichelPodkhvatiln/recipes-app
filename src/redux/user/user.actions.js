import UserActionsTypes from './user.actions.types'
import FirebaseAPI from '../../api/FirebaseAPI'

const getUserSnapshot = async (user) => {
  const userRef = await FirebaseAPI.createUserProfileDocument(user)
  return await userRef.get()
}

const setCurrentUser = (userData) => (dispatch) => {
  dispatch({
    type: UserActionsTypes.SET_CURRENT_USER,
    payload: userData
  })
}

export const resetUserErrors = () => ({
  type: UserActionsTypes.RESET_USER_ERRORS
})

export const userSignUp = ({ email, password, rememberMe }) => async (dispatch) => {
  dispatch({ type: UserActionsTypes.SIGN_UP_START })

  try {
    await FirebaseAPI.setPersistence(rememberMe)
    const { user } = await FirebaseAPI.signUp(email, password)
    const userSnapshot = await getUserSnapshot(user)

    dispatch({ type: UserActionsTypes.SIGN_UP_SUCCESS })
    dispatch(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    dispatch({ type: UserActionsTypes.SIGN_UP_FAILURE, payload: err })
  }
}

export const userSignIn = ({ email, password, rememberMe }) => async (dispatch) => {
  dispatch({ type: UserActionsTypes.SIGN_IN_START })

  try {
    await FirebaseAPI.setPersistence(rememberMe)
    const { user } = await FirebaseAPI.signIn(email, password)
    const userSnapshot = await getUserSnapshot(user)

    dispatch({ type: UserActionsTypes.SIGN_IN_SUCCESS })
    dispatch(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    dispatch({ type: UserActionsTypes.SIGN_IN_FAILURE, payload: err })
  }
}

export const userLogOut = () => async (dispatch) => {
  dispatch({ type: UserActionsTypes.SIGN_OUT_START })

  try {
    await FirebaseAPI.signOut()
    dispatch({ type: UserActionsTypes.SIGN_OUT_SUCCESS })
  } catch (err) {
    dispatch({ type: UserActionsTypes.SIGN_OUT_FAILURE })
  }
}

const isUserAuthenticated = () => async (dispatch) => {
  try {
    const user = await FirebaseAPI.getCurrentUser()

    if (!user) {
      dispatch({ type: UserActionsTypes.CHECK_USER_SESSION_SUCCESS })
      return
    }

    const userSnapshot = await getUserSnapshot(user)

    dispatch({ type: UserActionsTypes.CHECK_USER_SESSION_SUCCESS })
    dispatch(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    dispatch({ type: UserActionsTypes.CHECK_USER_SESSION_FAILURE, payload: err })
  }
}

export const checkUserSession = () => (dispatch) => {
  dispatch({ type: UserActionsTypes.CHECK_USER_SESSION_START })
  dispatch(isUserAuthenticated())
}


