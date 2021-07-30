import { persistedReducer } from '../../../redux/root.reducer'
import { store } from '../../../redux/store'

export type RootState = ReturnType<typeof persistedReducer>
export type AppDispatch = typeof store.dispatch
