import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore } from "redux-persist";
import thunk from 'redux-thunk'

import rootReducer from './root.reducer'

const middlewares = [thunk]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
)

export const store = createStore(rootReducer, enhancer)

export const persistor = persistStore(store)
