import { collectionGroup, collection, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadCategories } from "../../helpers/loadCategories";
import { loadTodos } from "../../helpers/loadTodos";
import { addNewCategory, savingNewCategory, setActiveCategory, setActiveCategoryTodos, setActiveTodo, setCategories, setNewTodo } from "./todosSlice"


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
}};

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
        
}};

export const startLoadingCategories = () => {
    return async(dispatch, getState) =>{

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');
        
        const categories = await loadCategories ( uid )

        dispatch( setCategories( categories ) )
}};

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

}};

export const startActiveTodo = ( todo ) => {
    return async(dispatch, getState ) => {

        dispatch( setActiveTodo( todo ) )
}};


export const startLoadingTodos = ( id ) => {
    return async(dispatch, getState ) => {

        const todos = []

        const collectionRef = collection( FirebaseDB, `${ uid }/${id}/todos` );
        const docs = await getDocs(collectionRef);
    
        docs.forEach( doc => {
            todos.push( todos );
        });

        dispatch( setActiveTodo( todos ))
}};

export const startSavingTodo = ( newTitle, newDescription ) =>{
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const activeCategoryId = getState().todos.activeCategory?.id;
        const activeTodoId = getState().todos.activeTodo?.id;
        const activeTodoType = getState().todos.activeTodo?.type;



        const newActiveTodo = {
            description:newDescription,
            type: activeTodoType,
            title: newTitle
        }

        dispatch( setActiveTodo( { id:activeTodoId, ...newActiveTodo} ));


        const newDoc = doc( FirebaseDB, `${ uid }/${activeCategoryId}/todos/${activeTodoId}` );
        await setDoc( newDoc, newActiveTodo );

}};

export const startDeletingTodo = ( todoId ) =>{
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const todos = getState().todos.activeCategory?.todos
        const activeCategoryId = getState().todos.activeCategory?.id;

        const todosUploaded = todos.filter(todo => todo.id != todoId);

        dispatch( setActiveCategoryTodos(todosUploaded) );
        await deleteDoc(doc(FirebaseDB, `${ uid }/${activeCategoryId}/todos/${ todoId }`));


    }};