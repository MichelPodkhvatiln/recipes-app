import { createSelector } from '@reduxjs/toolkit'

const selectUser = (state) => state.user

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
