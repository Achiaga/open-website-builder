import { configureStore } from '@reduxjs/toolkit'
import builderReducer from '../features/builderSlice'

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
})
