import { TodoItem } from "./components/TodoItem"
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "../hooks/useForm"
import { startLogout } from "../store/auth"
import { startNewCategory, startNewTodo } from "../store/todos"
import { CategoryItem } from "./components/CategoryItem"

export const TodosPage = () => {
    
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.todos.categories );
    const { displayName } = useSelector( state => state.auth );
    const activeCategoryName = useSelector((state) => state.todos.activeCategory?.name );
    const activeCategoryId = useSelector((state) => state.todos.activeCategory?.id );
    const activeCategoryTodos = useSelector(state => state.todos.activeCategory?.todos );

    const { formState, handleInputChange, handleResetForm, newCategory, todoTitle, todoDescription } = useForm({
        newCategory: '',
        todoTitle: '',
        todoDescription: ''
    });


    const addCategory = (e) => {
        e.preventDefault()
        if (e.target[0].value.trim != ''){
            dispatch( startNewCategory( e.target[0].value ) );

        }
        handleResetForm();
    }

    const addButton = document.querySelectorAll('.add-todo-icon')


    const addTodo = () => { dispatch( startNewTodo('todo', activeCategoryId ))};
    const addDoing = () => { dispatch( startNewTodo('doing', activeCategoryId ))};
    const addCompleted = () => { dispatch( startNewTodo('completed', activeCategoryId ))};

    const onLogout = () => { dispatch( startLogout() ) };




    return (
        <div className="todos-container">
            <nav className="categories-bar">

                { categories?.map(category =>(
                    <CategoryItem key={ category.id } {...category} />
                    
                ))}
                
                <div className="category-item add-category animate__animated animate__fadeInLeft">
                    <form  onSubmit={ addCategory }>
                        <input  type="text"
                                placeholder="Add a category"
                                name="newCategory"
                                value={ newCategory } 
                                onChange={ handleInputChange }>
                            
                        </input>
                        <button type="submit" className="add-category-button" disabled={newCategory == ''}>
                            <i className='bx bx-check'></i>
                        </button>

                    </form>

                </div>
                
            </nav>
            <div className="active-category">
                <div className="header-container">
                    <div className="active-category-title animate__animated animate__fadeInLeft">
                        { activeCategoryName && <span className="animate__animated animate__fadeInLeft">{ activeCategoryName }</span> }

                    </div>
                    <div className="logged-header">
                        <div className="user-name">{ displayName }</div>
                        <div className="logout-button" onClick={ onLogout }>
                            <i className='bx bx-log-out'></i>
                        </div>
                    </div>

                </div>
                <div className="todos-types animate__animated animate__fadeIn">
                    <div className="todos todos-type">
                        <div className="todos-type-header">
                            <span>To Do</span>
                            <button className="add-todo-icon" disabled={activeCategoryId == null}
                                    onClick={ addTodo }>
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>
                        
                        { activeCategoryTodos?.filter(todo => todo.type == 'todo').map( todo =>
                            <TodoItem todo={todo} key={ todo.id } /> 

                        )}

                    </div>
                    <div className="doing todos-type">
                        <div className="todos-type-header">
                            <span>Doing</span>
                            <button className="add-todo-icon" disabled={activeCategoryId == null}
                                    onClick={ addDoing }>
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>

                        { activeCategoryTodos?.filter(todo => todo.type == 'doing').map( todo => 
                            <TodoItem todo={todo} key={ todo.id }/> 

                        )}

                    </div>
                    <div className="completed todos-type">
                        <div className="todos-type-header">
                            <span>Completed</span>
                            <button className="add-todo-icon" disabled={activeCategoryId == null}
                                    onClick={ addCompleted }>
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>

                        { activeCategoryTodos?.filter(todo => todo.type == 'completed').map( todo => 
                            <TodoItem todo={todo} key={ todo.id }/> 
                        )}

                    </div>

                </div>
            </div>

        </div>
    )
}
