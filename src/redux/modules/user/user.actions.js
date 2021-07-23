import { createAsyncThunk } from '@reduxjs/toolkit'
import UserActionsTypes from './user.actions.types'
import FirebaseAPI from '../../../api/FirebaseAPI'
import { getUserAuthFunc, getUserSnapshot } from './user.utils'

export const checkUserSession = createAsyncThunk(
  UserActionsTypes.CHECK_USER_SESSION,
  async () => {
    const user = await FirebaseAPI.getCurrentUser()

    if (!user) return

    const userSnapshot = await getUserSnapshot(user)
    return { id: userSnapshot.id, ...userSnapshot.data() }
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
  async () => {
    await FirebaseAPI.signOut()
  }
)
