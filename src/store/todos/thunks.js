import { collectionGroup, collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadCategories } from "../../helpers/loadCategories";
import { loadTodos } from "../../helpers/loadTodos";
import { testingRequests } from "../../helpers/testingRequests";
import { addNewCategory, savingNewCategory, setActiveCategory, setActiveTodo, setCategories, setNewTodo } from "./todosSlice"


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

export const startNewTodo = ( typeOfTodo, categoryId  ) => {
    return async(dispatch, getState) => {

        // dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newTodo = {
            type: typeOfTodo,
            title: '',
            description: '',
        }
        console.log('startNewTodo')
        dispatch( setNewTodo( newTodo ));

        const newDoc = doc( collection( FirebaseDB, `${ uid }/${categoryId}/todos`))
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

        const todos = []

        const collectionRef = collection( FirebaseDB, `${ uid }/${id}/todos` );
        const docs = await getDocs(collectionRef);
    
        docs.forEach( doc => {
            todos.push({ id: doc.id, ...doc.data() });
        });

        const activeCategory = {
            name: name,
            id: id,
            todos: todos
        }

        dispatch( setActiveCategory( activeCategory ) );

    }
}

export const startActiveTodo = ( todo ) => {
    return async(dispatch, getState ) => {

        console.log( todo )
        dispatch( setActiveTodo( todo ) )
    }
}


export const startLoadingTodos = ( id ) => {
    return async(dispatch, getState ) => {

        const todos = []

        const collectionRef = collection( FirebaseDB, `${ uid }/${id}/todos` );
        const docs = await getDocs(collectionRef);
    
        docs.forEach( doc => {
            todos.push( todos );
        });

        dispatch( setActiveTodos( todos ))
    }
}


