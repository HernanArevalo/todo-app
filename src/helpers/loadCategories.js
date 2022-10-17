import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


export const loadCategories = async(uid = '') =>{

    const collectionRef = collection( FirebaseDB, `${ uid }/todos/categories`);
    const docs = await getDocs(collectionRef);

    const categories = []
    docs.forEach( doc => {
        categories.push({id: doc.id, ...doc.data()})

    })

    return categories
}