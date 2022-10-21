import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startActiveTodo, startDeletingTodo, startSavingTodo } from "../../store/todos/thunks";

export const TodoItem = ({ todo }) => {

  const dispatch = useDispatch();
  const activeTodoId = useSelector( (state) => state.todos.activeTodo?.id );


  const { formState, handleInputChange, handleResetForm, title, description } = useForm({
    title: todo.title,
    description: todo.description,
  });

  const [ElementClicked, setElementClicked] = useState(null);

//   window.onclick = e => {
//     setElementClicked(e.target);
//     console.log(ElementClicked);  // to get the element
// };

  useEffect(() => {

    if (activeTodoId !== undefined){
      dispatch( startSavingTodo( title, description ) );
    }

  }, [ title, description ]);
  

  // ? disable todo buttons
  const todoItem = document.querySelector('.todo-item');
  const [TodoFocus, setTodoFocus] = useState(false);
  todoItem,addEventListener('focusin', (event)=>{ setTodoFocus(true) });
  todoItem,addEventListener('focusout', (event)=>{ setTodoFocus(true) });


  const onClickTodoItem = () => {
    dispatch( startActiveTodo(todo) );
  };

  const OnClickDeleteTodo = () =>{
    dispatch( startDeletingTodo() );

  };


  return (
    <div className="todo-item" key={ todo.id } id={ todo.id } onClick={ onClickTodoItem }>

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

        { TodoFocus && todo.id == activeTodoId ?
          <div className="icons-todo-item animate__animated animate__fadeInDown">
              <i className='bx bx-left-arrow-alt' ></i>
              <i className='bx bx-right-arrow-alt'></i>
              <i className='bx bx-save' onClick={ onClickSaveTodo }></i>
              <i className='bx bx-trash' onClick={ OnClickDeleteTodo }></i>
          </div>
          :''
        }
    </div>

  )
}
