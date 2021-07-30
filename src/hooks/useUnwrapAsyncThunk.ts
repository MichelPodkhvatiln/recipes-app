import { useCallback } from 'react'
import { AsyncThunkAction, unwrapResult } from '@reduxjs/toolkit'
import { useAppDispatch } from './useAppDispatch'

export const useUnwrapAsyncThunk = () => {
  const dispatch = useAppDispatch()

  return useCallback(
    <T extends any>(asyncThunk: AsyncThunkAction<T, any, any>): Promise<T> =>
      dispatch(asyncThunk).then(unwrapResult),
    [dispatch]
  )
}
