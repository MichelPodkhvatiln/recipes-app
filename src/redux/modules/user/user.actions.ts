import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { services } from '../../../services'
import { getUserAuthFunc, getUserSnapshot } from './user.utils'
import { BrowserSyncActions } from '../../../constants/browserSyncActions'

import { IAuthFormData, ICurrentUser } from '../../../interfaces'

import { UserActionsTypes } from './user.actions.types'

export const checkUserSession = createAsyncThunk<ICurrentUser | null>(
  UserActionsTypes.CHECK_USER_SESSION,
  async () => {
    const user = await services.user.getCurrentUser()

    if (!user) return null

    const userSnapshot = await getUserSnapshot(user)

    if (!userSnapshot) return null

    const userData = userSnapshot.data()

    if (!userData) return null

    return {
      id: userSnapshot.id,
      email: userData.email as string
    }
  }
)

export const signIn = createAsyncThunk<ICurrentUser | null, IAuthFormData>(
  UserActionsTypes.SIGN_IN,
  (data) =>
    getUserAuthFunc(UserActionsTypes.SIGN_IN)(data)
)

export const signUp = createAsyncThunk<ICurrentUser | null, IAuthFormData>(
  UserActionsTypes.SIGN_UP,
  (data) =>
    getUserAuthFunc(UserActionsTypes.SIGN_UP)(data)
)

export const signOut = createAsyncThunk<void>(
  UserActionsTypes.SIGN_OUT,
  async () => {
    await services.auth.signOut()
    localStorage.setItem(BrowserSyncActions.AUTH_CHANGE, nanoid())
  }
)
