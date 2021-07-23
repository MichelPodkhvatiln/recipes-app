import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './root.reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.lastQueryDoc', 'meta.arg.lastQueryDoc']
      }
    })
})

export default store
