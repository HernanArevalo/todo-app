import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startActiveTodo, startChangeTodoType, startDeletingTodo, startSavingTodo } from "../../store/todos/thunks";
import { motion } from 'framer-motion'
import { savingActiveTodo, setActiveTodo } from "../../store/todos";

export const TodoItem = ({ todo }) => {

  const dispatch = useDispatch();
  const activeTodoId = useSelector( (state) => state.todos.activeTodo?.id );
  const { isSaving } = useSelector( state => state.todos );

  const { formState, handleInputChange, title, description } = useForm({
    title: todo.title,
    description: todo.description,
  });

  useEffect(() => {

    if (activeTodoId !== undefined){
      //dispatch( startSavingTodo( title, description ) );

      // ! TENGO QUE CREAR EL TODO NUEVO CON EL NUEVO TITLE Y DESCR. O CREAR UN NUEVO
      // ! SLICE QUE RECIBA TITLE Y DESCRIPTION NOMAS
      dispatch( setActiveTodo( todo ));
    }

  }, [ title, description ]);

  const onClickSaveTodo = (event) => {
    dispatch( startSavingTodo({title, description}) )
  }

  const onClickTodoItem = (event) => {
    event.stopPropagation();
    dispatch( startActiveTodo(todo) );

  };

  const OnClickDeleteTodo = () => {
    dispatch( startDeletingTodo( todo.id ) );

  };

  const onClickLeftArrow = () => {
    dispatch( startChangeTodoType( 'left' ) );
  }

  const onClickRightArrow = () => {
    dispatch( startChangeTodoType( 'right' ) );
  }

  const variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  }

  return (
    <motion.div className="todo-item" 
                key={ todo.id } 
                id={ todo.id } 
                onClick={ onClickTodoItem }
                initial={'hidden'}
                animate={'visible'}
                variants={variants}
                exit={'hidden'}
                layout={todo.id}

                >

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

        { true ?
          <div className="icons-todo-item animate__animated animate__fadeInDown">
              <button className="todo-button todo-arrow-button" 
                      disabled={todo.type === 'todo' || isSaving == true }
                      onClick={ onClickLeftArrow }>
                  <i className='bx bx-left-arrow-alt' ></i>
              </button>
              <button className="todo-button todo-arrow-button" 
                      disabled={todo.type === 'completed' || isSaving == true }
                      onClick={ onClickRightArrow }>
                  <i className='bx bx-right-arrow-alt'></i>
              </button>
              <button className="todo-button todo-save-button"
                      disabled={ isSaving == true }
                      onClick={ onClickSaveTodo }>
                  <i className='bx bx-save' onClick={ () => {} }></i>
              </button>
              <button className="todo-button todo-delete-button"
                      disabled={ isSaving == true }>
                  <i className='bx bx-trash' onClick={ OnClickDeleteTodo }></i>
              </button>
          </div>
          :''
        }
    </motion.div>

  )
}
