import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../redux/root.reducer'

export function createTestStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ['payload.lastQueryDoc', 'meta.arg.lastQueryDoc']
        }
      })
  })
}
