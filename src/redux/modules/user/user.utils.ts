import { nanoid } from '@reduxjs/toolkit'
import { services } from '../../../services'
import { BrowserSyncActions } from '../../../constants/browserSyncActions'
import {
  FirebaseDocumentData,
  FirebaseDocumentSnapshot,
  FirebaseUser,
  IAuthFormData,
  ICurrentUser
} from '../../../interfaces'

import { UserActionsTypes } from './user.actions.types'

export const getUserSnapshot = async (
  user: FirebaseUser | null
): Promise<FirebaseDocumentSnapshot<FirebaseDocumentData> | null> => {
  if (!user) return null

  const userRef = await services.user.createUserProfileDocument({ user })
  return await userRef.get()
}

export const getUserAuthFunc = (
  actionType: UserActionsTypes.SIGN_IN | UserActionsTypes.SIGN_UP
): (data: IAuthFormData) => Promise<ICurrentUser | null> => {
  const authFunc = actionType === UserActionsTypes.SIGN_IN
    ? services.auth.signIn
    : services.auth.signUp

  return async ({ email, password, rememberMe }) => {
    await services.auth.setPersistence(rememberMe)

    const { user } = await authFunc(email, password)
    const userSnapshot = await getUserSnapshot(user)

    if (!userSnapshot) return null

    const userData = userSnapshot.data()

    if (!userData) return null

    if (rememberMe) {
      localStorage.setItem(BrowserSyncActions.AUTH_CHANGE, nanoid())
    }

    return {
      id: userSnapshot.id,
      email: userData.email as string
    }
  }
}
