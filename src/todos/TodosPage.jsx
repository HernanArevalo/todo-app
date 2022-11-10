import { TodoItem } from "./components/TodoItem"
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "../hooks/useForm"
import { startLogout } from "../store/auth"
import { startNewCategory, startNewTodo } from "../store/todos"
import { CategoryItem } from "./components/CategoryItem"
import { motion, AnimatePresence } from 'framer-motion'

export const TodosPage = () => {
    
    const dispatch = useDispatch();

    const { displayName } = useSelector( state => state.auth );
    const { categories, isSaving } = useSelector( state => state.todos );
    const activeCategoryName = useSelector( state => state.todos.activeCategory?.name );
    const activeCategoryId = useSelector( state => state.todos.activeCategory?.id );
    const activeCategoryTodos = useSelector(state => state.todos.activeCategory?.todos );

    const { formState, handleInputChange, handleResetForm, newCategory, } = useForm({
        newCategory: '',
    });


    const addCategory = (e) => {
        e.preventDefault()
        if (e.target[0].value.trim != ''){
            dispatch( startNewCategory( e.target[0].value ) );

        }
        handleResetForm();
    }

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
                        <button className="logout-button" onClick={ onLogout } disabled={ isSaving == true }>
                            <i className='bx bx-log-out'></i>
                        </button>
                    </div>

                </div>
                <div className="todos-types animate__animated animate__fadeIn">
                    <motion.div layout
                                className="todos todos-type">
                        <div className="todos-type-header">
                            <span>To Do</span>
                            <button className="add-todo-icon" disabled={activeCategoryId == null || isSaving == true }
                                    onClick={ addTodo }>
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>

                        <AnimatePresence>
                        { activeCategoryTodos?.filter(todo => todo.type == 'todo').map( todo =>
                            <TodoItem todo={todo} key={ todo.id } /> 

                        )}
                        </AnimatePresence>

                    </motion.div>
                    <motion.div layout
                                  className="doing todos-type">
                            <div className="todos-type-header">
                                <span>Doing</span>
                                <button className="add-todo-icon" disabled={ activeCategoryId == null || isSaving == true }
                                        onClick={ addDoing }>
                                    <i className='bx bx-plus'></i>
                                </button>
                            </div>

                            <AnimatePresence>
                                { activeCategoryTodos?.filter(todo => todo.type == 'doing').map( todo => 
                                    <TodoItem todo={todo} key={ todo.id }/> 

                                )}  

                            </AnimatePresence>

                    </motion.div>
                    <motion.div layout
                                className="completed todos-type">
                        <div className="todos-type-header">
                            <span>Completed</span>
                            <button className="add-todo-icon" disabled={activeCategoryId == null || isSaving == true }
                                    onClick={ addCompleted }>
                                <i className='bx bx-plus'></i>
                            </button>
                        </div>

                        <AnimatePresence>
                            { activeCategoryTodos?.filter(todo => todo.type == 'completed').map( todo => 
                                <TodoItem todo={todo} key={ todo.id }/> 
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </div>

        </div>
    )
}
