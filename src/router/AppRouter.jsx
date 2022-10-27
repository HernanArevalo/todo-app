import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';

import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';
import { TodosPage } from '../todos/TodosPage';


export const AppRouter = () => {

  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
     <Routes>

         {
           (status === 'authenticated')
            ? <Route path="/" element={ <TodosPage /> } />
            : <Route path="/auth/*" element={ <AuthRoutes /> } />
         }

        <Route path='/*' element={ status === 'authenticated'? <Navigate to='/' />: <Navigate to='/auth/*' /> } />
        
      </Routes>



    //     <Routes>

    //       <Route path="/" element={ <TodosPage /> } />

    //    </Routes>
  )
}
