import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startActiveCategory, startDeletingCategory } from '../../store/todos/thunks';


export const CategoryItem = ({ name, id }) => {

    const dispatch = useDispatch();
    const ActiveCategory = useSelector((state) => state.todos.activeCategory)

    const OnClickCategory = ( ) => {
        dispatch( startActiveCategory( name, id ) );
    }

    const onClickDeleteButton = ( event ) => {
      event.stopPropagation();
      dispatch(startDeletingCategory( id ))

    };

  return (
    <>
      <div 
          className={ ActiveCategory?.id !== id ? 
                      "category-item animate__animated animate__fadeInLeft category-inactive":
                      "category-item animate__animated animate__fadeInLeft category-active"
                      } 
          onClick={ OnClickCategory }>
          { name }
          <button className="delete-category-button" onClick={ onClickDeleteButton }>
              <i className='bx bx-x'></i>
          </button>
      </div>
    
    </>
  )
}
