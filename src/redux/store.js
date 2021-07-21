import { applyMiddleware, createStore } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootReducer from './root.reducer'

const middlewares = [thunk]

const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, enhancer)

export const persistor = persistStore(store)
