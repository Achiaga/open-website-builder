import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/builderSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
