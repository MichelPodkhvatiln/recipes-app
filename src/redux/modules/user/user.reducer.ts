import { createSlice, isAnyOf } from '@reduxjs/toolkit'

import { IUserState } from '../../../interfaces'

import { checkUserSession, signIn, signOut, signUp } from './user.actions'

const initialState: IUserState = {
  currentUser: null
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signOut.fulfilled, (state) => {
      state.currentUser = null
    })

    builder.addMatcher(isAnyOf(
      checkUserSession.fulfilled,
      signIn.fulfilled,
      signUp.fulfilled
    ), (state, action) => {
      state.currentUser = action.payload
    })
  }
})

export default slice.reducer
