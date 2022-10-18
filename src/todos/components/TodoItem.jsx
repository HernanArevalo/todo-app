import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const TodoItem = ({titl, descriptio}) => {

  const { formState, handleInputChange, handleResetForm, title, description } = useForm({
    title: titl,
    description: descriptio,
});




  const todoItem = document.querySelector('.todo-item')

  const [TodoFocus, setTodoFocus] = useState(false)

  todoItem,addEventListener('focusin', (event)=>{
    setTodoFocus(true)
  })

  todoItem,addEventListener('focusout', (event)=>{
    setTodoFocus(false)

  })





  return (
    <div className="todo-item" >

        <textarea className="input-title" 
                  onChange={ handleInputChange }
                  name="title"
                  value={ title }
                  rows="2" 
                  placeholder="Title" 
                  maxLength="30"></textarea>
        <textarea className="input-description" 
                  onChange={ handleInputChange }
                  name="description"
                  value={ description }
                  rows="3" 
                  placeholder="Description" >

        </textarea>

        { TodoFocus?
          <div className="icons-todo-item animate__animated animate__fadeInDown">
              <i className='bx bx-left-arrow-alt' ></i>
              <i className='bx bx-right-arrow-alt'></i>
              <i className='bx bx-save'></i>
              <i className='bx bx-trash' ></i>
          </div>
          :''
        }
    </div>

  )
}
