import { createSlice } from '@reduxjs/toolkit'
import { checkUserSession, signIn, signOut, signUp } from './user.actions'

const INITIAL_STATE = {
  currentUser: null
}

const slice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //CHECK USER SESSION
    builder.addCase(checkUserSession.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    //SIGN IN
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    //SIGN UP
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })

    //SIGN OUT
    builder.addCase(signOut.fulfilled, (state) => {
      state.currentUser = null
    })
  }
})

export default slice.reducer
