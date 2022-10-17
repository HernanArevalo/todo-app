import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveCategory } from '../../store/todos';


export const CategoryItem = ({ name, id }) => {

    const dispatch = useDispatch();
    const categoryActive = useSelector((state) => state.todos.categoryActive)

    const OnClickCategory = (category) => {
        dispatch( setActiveCategory({ name, id}) );
    }

    

  return (
    <div 
         className={ categoryActive?.id === id ? 
                     "category-item animate__animated animate__fadeInLeft active":
                     "category-item animate__animated animate__fadeInLeft"
                    } 
         onClick={ OnClickCategory }>
        { name }
    </div>
  )
}
