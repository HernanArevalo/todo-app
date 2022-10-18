import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadTodos = async( categories = [], uid = '' ) => {

    for (const category of categories) {

        const todosRef = collection( FirebaseDB, `${ uid }/todos/categories/${category.id}/todo`)
        const todosdocs = await getDocs( todosRef );

        const todos = []
        todosdocs.forEach( todo => {
            todos.push({...todo.data()})
        })
        category.todos = todos
        
        const doingRef = collection( FirebaseDB, `${ uid }/todos/categories/${category.id}/doing`)
        const doingdocs = await getDocs( doingRef );
        
        const doings = []
        doingdocs.forEach( doing => {
            doings.push({...doing.data()})
        })
        category.doings = todos

        
        const completedRef = collection( FirebaseDB, `${ uid }/todos/categories/${category.id}/completed`)
        const completeddocs = await getDocs( completedRef );

        const completeds = []
        completeddocs.forEach( completed => {
            completeds.push({...completed.data()})
        })
        category.completeds = todos

    }
    // console.log(categories)

    return categories
}