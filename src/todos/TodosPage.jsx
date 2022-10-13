

export const TodosPage = () => {



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
                <div className="add-category">Add category</div>
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
                        <div className="todo-item">

                            <textarea className="input-title" rows="2" placeholder="Title" maxLength="30"></textarea>
                            <textarea className="input-description" rows="3" placeholder="Description" ></textarea>


                            <div className="icons-todo-item">
                                <i className='bx bx-left-arrow-alt' ></i>
                                <i className='bx bx-right-arrow-alt'></i>
                                <i className='bx bx-check'></i>
                                <i className='bx bx-trash' ></i>
                            </div>

                        </div>
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
