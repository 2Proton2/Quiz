import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/user.slice'

const store = configureStore({
  reducer: {
    users: usersReducer
  },
})

export default store