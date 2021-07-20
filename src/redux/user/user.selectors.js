import { createSelector } from 'reselect'

const selectUser = (state) => state.user

export const selectCheckUserSessionProcess = createSelector(
  [selectUser],
  (user) => user.isCheckUserSessionProcess
)

export const selectAuthUserProcess = createSelector(
  [selectUser],
  (user) => user.isAuthUserProcess
)

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)

export const selectCurrentUserId = createSelector(
  [selectUser],
  (user) => user.currentUser?.id
)

export const selectIsAuthenticatedUser = createSelector(
  [selectUser],
  (user) => !!user.currentUser
)

export const selectUserProcessError = createSelector(
  [selectUser],
  (user) => user.error
)
