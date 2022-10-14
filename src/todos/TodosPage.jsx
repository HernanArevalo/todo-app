import { TodoItem } from "./components/TodoItem"
import { useSelector, useDispatch } from 'react-redux'
import { addCategory } from "../store/slices/todos"
import { useForm } from "../hooks/useForm"

export const TodosPage = () => {

    const categories = useSelector((state) => state.todos.categories )
    const dispatch = useDispatch()

    const { formState, handleInputChange, handleResetForm, newCategory, todoTitle, todoDescription } = useForm({
        newCategory: '',
        todoTitle: '',
        todoDescription: ''
    });


    const addNewCategory = (e) => {
        e.preventDefault()

        dispatch(addCategory(e.target[0].value))
    }



    return (
        <div className="todos-container">
            <nav className="categories-bar">
                <div className="category-item">
                    Home
                </div>
                <div className="category-item active">
                    Work
                </div>
                <div className="category-item">
                    Home
                </div>
                
                <div className="category-item add-category">
                    <form  onSubmit={ addNewCategory }>
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
                <div className="active-category-title">
                    <span>Home</span>
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
