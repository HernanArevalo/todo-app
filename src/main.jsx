import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodosApp } from './TodosApp'
import { Provider } from 'react-redux'
import { store } from './store'
import './styles.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
        <TodosApp />
     </Provider>
  </React.StrictMode>
)
