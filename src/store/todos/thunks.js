import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadCategories } from "../../helpers/loadCategories";
import { addNewCategory, isSaving, notSaving, savingNewCategory, setActiveCategory, setActiveCategoryTodos, setActiveTodo, setCategories, setNewTodo } from "./todosSlice"


export const startNewCategory = ( categoryName ) => {
    return async(dispatch, getState) => {
        dispatch( isSaving() );
        dispatch( savingNewCategory )

        const { uid } = getState().auth;

        const newCategory = {
            name: categoryName,
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/`))
        await setDoc( newDoc, newCategory );
        
        newCategory.id = newDoc.id;  

        dispatch( addNewCategory( newCategory ));
        dispatch( notSaving() );
}};

export const startNewTodo = ( typeOfTodo, categoryId  ) => {
    return async(dispatch, getState) => {
        // dispatch( isSaving() );

        const { uid } = getState().auth;

        const newTodo = {
            type: typeOfTodo,
            title: '',
            description: '',
        }
        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/${categoryId}/todos`));
        await setDoc( newDoc, newTodo );
        
        newTodo.id = newDoc.id
        dispatch( setNewTodo( newTodo ));

        dispatch( notSaving() );
}};

export const startLoadingCategories = () => {
    return async(dispatch, getState) =>{
        dispatch( isSaving() );

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');
        
        const categories = await loadCategories ( uid );

        dispatch( setCategories( categories ) );
        dispatch( notSaving() );
}};

export const startActiveCategory = ( name, id ) => {
    return async(dispatch, getState) =>{
        const { uid } = getState().auth;
        const todos = []

        dispatch( isSaving() );

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
        dispatch( notSaving() );
}};

export const startActiveTodo = ( todo ) => {
    return async(dispatch, getState ) => {

        dispatch( setActiveTodo( todo ) );
}};


export const startLoadingTodos = ( id ) => {
    return async(dispatch, getState ) => {
        const { uid } = getState().auth;

        dispatch( isSaving() );

        console.log('startLoadingTodos')
        const todos = [];

        const collectionRef = collection( FirebaseDB, `${ uid }/${id}/todos` );
        const docs = await getDocs(collectionRef);
    
        docs.forEach( doc => {
            todos.push( todos );
        });

        dispatch( setActiveCategoryTodos( todos ));
        dispatch( notSaving() );
}};

export const startSavingTodo = ( newTitle, newDescription ) =>{
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const activeCategoryId = getState().todos.activeCategory?.id;
        const activeTodoId = getState().todos.activeTodo?.id;
        const activeTodoType = getState().todos.activeTodo?.type;

        dispatch( isSaving() );

        const newActiveTodo = {
            type: activeTodoType,
            title: newTitle,
            description: newDescription,
        };

        dispatch( setActiveTodo( { id:activeTodoId, ...newActiveTodo} ));


        const newDoc = doc( FirebaseDB, `${ uid }/${activeCategoryId}/todos/${activeTodoId}` );
        await setDoc( newDoc, newActiveTodo, { merge: true } );
        dispatch( notSaving() );
}};

export const startDeletingTodo = ( todoId ) =>{
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const todos = getState().todos.activeCategory?.todos;
        const activeCategoryId = getState().todos.activeCategory?.id;

        const todosUploaded = todos.filter(todo => todo.id != todoId);

        dispatch( setActiveCategoryTodos(todosUploaded) );
        await deleteDoc(doc(FirebaseDB, `${ uid }/${activeCategoryId}/todos/${ todoId }`));

    }
};

export const startDeletingCategory = ( id ) => {
    return async(dispatch, getState ) => {
        const { uid } = getState().auth;
        const categories = getState().todos.categories;

        console.log('startDeletingCategory')

        const categoriesUploaded = categories.filter(category => category.id != id);

        dispatch( setCategories( categoriesUploaded ));
        await deleteDoc(doc(FirebaseDB, `${ uid }/${id}`));
        dispatch(setActiveCategory(categories[0]))
    }
}


export const startChangeTodoType = ( arrowDirection ) => {
    return async( dispatch, getState) =>{
        const { id:activeCategoryId, todos:activeCategoryTodos } = getState().todos.activeCategory;
        const { uid } = getState().auth;
        const todos = getState().todos.activeCategory?.todos;
        const todo = getState().todos.activeTodo;

        dispatch( isSaving() );

        var newType = ''

        if (todo.type == 'todo'){
            newType = 'doing';
        }else if (todo.type == 'doing' && arrowDirection == 'left'){
            newType = 'todo';
        }else if (todo.type == 'doing' && arrowDirection == 'right'){
            newType = 'completed';
        }else{
            newType = 'doing'
        };
        
        const newTodo = {   
            ...todo,
            type: newType,
        };

        
        await setDoc(doc( FirebaseDB, 
                          `${ uid }/${activeCategoryId}/todos/${ todo.id }`),
                        {   type: newType,
                            title: todo.title,
                            description: todo.description
                        }
                        );
                        
        dispatch( setActiveTodo( newTodo ));

        dispatch( notSaving() );
    }
}
