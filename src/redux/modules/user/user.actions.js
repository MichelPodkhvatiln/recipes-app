import { createAsyncThunk } from '@reduxjs/toolkit'
import UserActionsTypes from './user.actions.types'
import { services } from '../../../services'
import { getUserAuthFunc, getUserSnapshot } from './user.utils'

export const checkUserSession = createAsyncThunk(
  UserActionsTypes.CHECK_USER_SESSION,
  async () => {
    const user = await services.user.getCurrentUser()

    if (!user) return null

    const userSnapshot = await getUserSnapshot(user)
    const userData = userSnapshot.data()

    return {
      id: userSnapshot.id,
      email: userData.email
    }
  }
)

export const signIn = createAsyncThunk(
  UserActionsTypes.SIGN_IN,
  ({ email, password, rememberMe }) =>
    getUserAuthFunc(UserActionsTypes.SIGN_IN)({ email, password, rememberMe })
)

export const signUp = createAsyncThunk(
  UserActionsTypes.SIGN_UP,
  ({ email, password, rememberMe }) =>
    getUserAuthFunc(UserActionsTypes.SIGN_UP)({ email, password, rememberMe })
)

export const signOut = createAsyncThunk(
  UserActionsTypes.SIGN_OUT,
  () => {
    services.auth.signOut()
  }
)
