import { createSlice } from '@reduxjs/toolkit'
import { checkUserSession, signIn, signOut, signUp } from './user.actions'

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isAuthUserProcess: false
}

const slice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    //CHECK USER SESSION
    builder.addCase(checkUserSession.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })


    //SIGN IN
    builder.addCase(signIn.pending, (state) => {
      state.error = null
      state.isAuthUserProcess = true
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.error = null
      state.isAuthUserProcess = false
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.error = action.payload
      state.isAuthUserProcess = false
    })

    //SIGN UP
    builder.addCase(signUp.pending, (state) => {
      state.error = null
      state.isAuthUserProcess = true
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.error = null
      state.isAuthUserProcess = false
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload
      state.isAuthUserProcess = false
    })

    //SIGN OUT
    builder.addCase(signOut.pending, (state) => {
      state.error = null
      state.isAuthUserProcess = true
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.currentUser = null
      state.error = null
      state.isAuthUserProcess = false
    })
    builder.addCase(signOut.rejected, (state, action) => {
      state.error = action.payload
      state.isAuthUserProcess = false
    })
  }
})

export default slice.reducer
