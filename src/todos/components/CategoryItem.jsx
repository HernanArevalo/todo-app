import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCategory } from '../../store/todos';
import { startActiveCategory } from '../../store/todos/thunks';


export const CategoryItem = ({ name, id }) => {

    const dispatch = useDispatch();
    const ActiveCategory = useSelector((state) => state.todos.ActiveCategory)

    const OnClickCategory = ( ) => {
        dispatch( startActiveCategory( name, id ) );
    }

    

  return (
    <div 
         className={ ActiveCategory?.id === id ? 
                     "category-item animate__animated animate__fadeInLeft category-active":
                     "category-item animate__animated animate__fadeInLeft category-inactive"
                    } 
         onClick={ OnClickCategory }>
        { name }
    </div>
  )
}
