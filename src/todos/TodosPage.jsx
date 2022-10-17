import { TodoItem } from "./components/TodoItem"
import { useSelector, useDispatch } from 'react-redux'
import { addNewCategory } from "../store/todos"
import { useForm } from "../hooks/useForm"
import { startLogout } from "../store/auth"
import { startNewCategory } from "../store/todos/thunks"

export const TodosPage = () => {

    const categories = useSelector((state) => state.todos.categories )
    const dispatch = useDispatch()


    const { formState, handleInputChange, handleResetForm, newCategory, todoTitle, todoDescription } = useForm({
        newCategory: '',
        todoTitle: '',
        todoDescription: ''
    });


    const addCategory = (e) => {
        e.preventDefault()
        if (e.target[0].value.trim != ''){
            dispatch( startNewCategory(e.target[0].value) )

        }
        handleResetForm()
    }

    const onLogout = () => {
        dispatch( startLogout() );
    }

    const { displayName } = useSelector( state => state.auth );

    return (
        <div className="todos-container">
            <nav className="categories-bar">

                { categories.map(category => 
                    (<div className="category-item animate__animated animate__fadeInLeft">
                        {category.name}
                    </div>)
                )}
                
                <div className="category-item add-category animate__animated animate__fadeInLeft">
                    <form  onSubmit={ addCategory }>
                        <input  type="text"
                                placeholder="Add category"
                                name="newCategory"
                                value={ newCategory } 
                                onChange={ handleInputChange }>
                            
                        </input>
                        <button type="submit">
                            <i className='bx bx-check'></i>
                        </button>

                    </form>

                </div>
                
            </nav>
            <div className="active-category">
                <div className="header-container">
                    <div className="active-category-title">
                        <span>Home</span>
                    </div>
                    <div className="logged-header">
                        <div className="user-name">{ displayName }</div>
                        <div className="logout-button" onClick={ onLogout }>
                            <i className='bx bx-log-out'></i>
                        </div>
                    </div>

                </div>
                <div className="todos-types">
                    <div className="todos todos-type">
                        <div className="todos-type-header">
                            <span>To Do</span>
                            <button className="add-todo-icon">
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>
                        
                        <div className="todo-item">

                        </div>

                    </div>
                    <div className="doing todos-type">
                        <div className="todos-type-header">
                            <span>Doing</span>
                            <button className="add-todo-icon">
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>

                        { <TodoItem /> }

                    </div>
                    <div className="completed todos-type">
                        <div className="todos-type-header">
                            <span>Completed</span>
                            <button className="add-todo-icon">
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>
                        <div className="todo-item">

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
