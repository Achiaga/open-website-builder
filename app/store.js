import { configureStore } from '@reduxjs/toolkit'
import builderReducer from '../src/features/builderSlice'
import userReducer from '../src/features/userSlice'

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    user: userReducer,
  },
})
