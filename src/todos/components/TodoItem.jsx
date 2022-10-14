
export const TodoItem = () => {



  return (
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

  )
}
