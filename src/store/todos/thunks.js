import { collectionGroup, collection, doc, setDoc, getDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadCategories } from "../../helpers/loadCategories";
import { loadTodos } from "../../helpers/loadTodos";
import { testingRequests } from "../../helpers/testingRequests";
import { addNewCategory, savingNewCategory, setActiveCategory, setCategories } from "./todosSlice"


export const startNewCategory = ( categoryName ) => {
    return async(dispatch, getState) => {

        dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newCategory = {
            name: categoryName
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/`))
        await setDoc( newDoc, newCategory );
        
        
        newCategory.id = newDoc.id;  

        dispatch( addNewCategory( categoryName ))

}}

export const startNewTodo = ( categoryId, typeOfTodo ) => {
    return async(dispatch, getState) => {

        // dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newTodo = {
            title: '',
            description: '',
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/${categoryId}/${typeOfTodo}/`))
        await setDoc( newDoc, newTodo );
        
        

    }

}

export const startLoadingCategories = () => {
    return async(dispatch, getState) =>{

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');
        
        const categories = await loadCategories ( uid )

        dispatch( setCategories( categories ) )
}}

export const startActiveCategory = ( name, id ) => {
    return async(dispatch, getState) =>{
        
        const { uid } = getState().auth;

        const docRef = doc(FirebaseDB, uid, id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())

        dispatch( setActiveCategory( { name, id, ...docSnap.data() } ) );

    }
}



export const startLoadingTodos = () => {
    return async(dispatch, getState ) => {


    }
}


