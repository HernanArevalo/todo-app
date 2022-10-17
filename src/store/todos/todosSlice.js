import { createSlice } from '@reduxjs/toolkit';


export const todosSlice = createSlice({
    name: 'categories',
    initialState: {
        isSaving: false,
        messageSaved: '',
        categories: [
            {
                name: 'Home',
                todo: [],
                doing: [],
                completed: []
            },
            {
                name: 'Work',
                todo: [],
                doing: [],
                completed: []
            }
    ]},
        categorieActive: null,
        todoActive: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
    
    reducers: {
        addNewCategory: (state, action ) => {

            state.categories.push({
                name: action.payload,
                todo: [],
                doing: [],
                completed: []
            })   
        },
        savingNewCategory: ( state ) => {
            state.isSaving = true;
        },

    }
});


// Action creators are generated for each case reducer function
export const { addNewCategory,
               savingNewCategory,
            
            
            } = todosSlice.actions;