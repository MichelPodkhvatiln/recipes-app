import { useCallback } from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

export const useUnwrapAsyncThunk = () => {
  const dispatch = useDispatch()

  return useCallback(
    (asyncThunk) => dispatch(asyncThunk).then(unwrapResult),
    [dispatch]
  )
}
