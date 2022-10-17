import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadCategories } from "../../helpers/loadCategories";
import { addNewCategory, savingNewCategory, setCategories } from "./todosSlice"


export const startNewCategory = ( categoryName ) => {
    return async(dispatch, getState) => {

        dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newCategory = {
            name: categoryName,
            todo: [],
            doing: [],
            completed: []
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/todos/categories`))
        await setDoc( newDoc, newCategory );
        
        
        newCategory.id = newDoc.id;  

        dispatch( addNewCategory( categoryName ))

    }

}

export const startNewTodo = ( categoryId, typeOfTodo = 'todo' ) => {
    return async(dispatch, getState) => {

        // dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newTodo = {
            title: 'ASD',
            description: 'asd',
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/todos/categories/${categoryId}/${typeOfTodo}/`))
        await setDoc( newDoc, newTodo );
        
        
        newCategory.id = newDoc.id;  

        dispatch( addNewCategory( categoryName ))

    }

}

export const startLoadingCategories = () => {
    return async(dispatch, getState) =>{

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');
        
        const categories = await loadCategories ( uid )
        dispatch( setCategories( categories ) )
    }
}



// ! CARGAR CATEGORIAS EN EL LOGIN