import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveCategory } from '../../store/todos';


export const CategoryItem = ({ name, id }) => {

    const dispatch = useDispatch();

    const OnClickCategory = (category) => {
        dispatch( setActiveCategory({ name, id}) )
    }


  return (
    <div 
         className="category-item animate__animated animate__fadeInLeft" 
         onClick={ OnClickCategory }>
        {name}
    </div>
  )
}
