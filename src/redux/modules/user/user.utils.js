import FirebaseAPI from '../../../api/FirebaseAPI'
import UserActionsTypes from './user.actions.types'

const AuthActionTypes = {
  [UserActionsTypes.SIGN_IN]: UserActionsTypes.SIGN_IN,
  [UserActionsTypes.SIGN_UP]: UserActionsTypes.SIGN_UP
}

export const getUserSnapshot = async (user) => {
  const userRef = await FirebaseAPI.createUserProfileDocument(user)
  return await userRef.get()
}

export const getUserAuthFunc = (actionType) => {
  if (!actionType || !Object.keys(AuthActionTypes).includes(actionType)) return

  const authFunc = actionType === AuthActionTypes[UserActionsTypes.SIGN_IN] ? FirebaseAPI.signIn : FirebaseAPI.signUp

  return async ({ email, password, rememberMe }) => {
    await FirebaseAPI.setPersistence(rememberMe)
    const { user } = await authFunc(email, password)
    const userSnapshot = await getUserSnapshot(user)

    return { id: userSnapshot.id, ...userSnapshot.data() }
  }
}
