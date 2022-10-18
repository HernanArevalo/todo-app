import { collectionGroup, collection, getDocs, query } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { addNewCategory } from '../store/todos/todosSlice';


export const loadCategories = async(uid = '') =>{

    const collectionRef = collection( FirebaseDB, `${ uid }`);
    const docs = await getDocs(collectionRef);

    const categories = []

    docs.forEach( async doc => {
        categories.push({ id: doc.id, ...doc.data() })
    })
    return categories
}