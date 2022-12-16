import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { TodosApp } from './TodosApp'
import { store } from './store'
import './styles.css'


ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
     <Provider store={store}>
         <BrowserRouter>
            <TodosApp />
         </BrowserRouter>
     </Provider>
//   </React.StrictMode>
)
