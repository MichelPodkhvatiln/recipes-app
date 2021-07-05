import UserActionsTypes from './user.actions.types'
import { auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'

const getUserSnapshot = async (user) => {
  const userRef = await createUserProfileDocument(user)
  return await userRef.get()
}

const setCurrentUser = (userData) => (dispatch) => {
  dispatch({
    type: UserActionsTypes.SET_CURRENT_USER,
    payload: userData
  })
}

export const userSignUp = ({ email, password }) => async (dispatch) => {
  dispatch({ type: UserActionsTypes.SIGN_UP_START })

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    const userSnapshot = await getUserSnapshot(user)

    dispatch({ type: UserActionsTypes.SIGN_UP_SUCCESS })
    dispatch(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    dispatch({ type: UserActionsTypes.SIGN_UP_FAILURE, payload: err })
  }
}

export const userSignIn = ({ email, password }) => async (dispatch) => {
  dispatch({ type: UserActionsTypes.SIGN_IN_START })

  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    const userSnapshot = await getUserSnapshot(user)

    dispatch({ type: UserActionsTypes.SIGN_IN_SUCCESS })
    dispatch(setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    dispatch({ type: UserActionsTypes.SIGN_IN_FAILURE, payload: err })
  }
}

const isUserAuthenticated = () => async (dispatch) => {
  try {
    const user = await getCurrentUser()

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


