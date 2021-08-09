import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../interfaces'

const selectUser = (state: RootState) => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)

export const selectIsAuthenticatedUser = createSelector(
  [selectUser],
  (user) => !!user.currentUser
)

export const selectCurrentUserId = createSelector(
  [selectUser],
  (user) => user.currentUser?.id
)
