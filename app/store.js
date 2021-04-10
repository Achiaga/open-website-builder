import { configureStore } from '@reduxjs/toolkit'
import builderReducer from '../features/builderSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    user: userReducer,
  },
})
