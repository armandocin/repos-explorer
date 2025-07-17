import { configureStore } from '@reduxjs/toolkit'
import repositoriesReducer from './slices/repositories'

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer
  }
})

// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
