import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewCategory, savingNewCategory } from "./todosSlice"


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

export const startNewTodo = ( categoryName ) => {
    return async(dispatch, getState) => {

        // dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newCategory = {
            name: categoryName,
            todo: [],
            doing: [],
            completed: []
        }
        const newTodo = {
            title: 'ASD',
            description: 'asd',
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/todos/categories`))
        await setDoc( newDoc, newCategory );
        
        
        newCategory.id = newDoc.id;  

        dispatch( addNewCategory( categoryName ))

    }

}