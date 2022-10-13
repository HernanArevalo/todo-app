import { useState } from 'react'
import { TodosPage } from './todos/TodosPage'

export const TodosApp = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodosPage />
    </>
  )
}

