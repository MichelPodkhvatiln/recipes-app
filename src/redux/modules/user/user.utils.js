import { services } from '../../../services'
import UserActionsTypes from './user.actions.types'

const AuthActionTypes = {
  [UserActionsTypes.SIGN_IN]: UserActionsTypes.SIGN_IN,
  [UserActionsTypes.SIGN_UP]: UserActionsTypes.SIGN_UP
}

export const getUserSnapshot = async (user) => {
  const userRef = await services.user.createUserProfileDocument(user)
  return await userRef.get()
}

export const getUserAuthFunc = (actionType) => {
  if (!actionType || !Object.keys(AuthActionTypes).includes(actionType)) return

  const authFunc = actionType === AuthActionTypes[UserActionsTypes.SIGN_IN]
    ? services.auth.signIn
    : services.auth.signUp

  return async ({ email, password, rememberMe }) => {
    await services.auth.setPersistence(rememberMe)

    const { user } = await authFunc(email, password)
    const userSnapshot = await getUserSnapshot(user)
    const userData = userSnapshot.data()

    return {
      id: userSnapshot.id,
      email: userData.email
    }
  }
}
