import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { todosSlice } from './todos'

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    auth: authSlice.reducer
  },
})