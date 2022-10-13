import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth/authSlices'
import { todosSlice } from './slices/todos'

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    auth: authSlice.reducer
  },
})