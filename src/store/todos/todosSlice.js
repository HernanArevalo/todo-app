import { createSlice } from '@reduxjs/toolkit';


export const todosSlice = createSlice({
    name: 'categories',
    initialState: {
        isSaving: false,
        messageSaved: '',
        categories: [],
        categoryActive: null,
        // categoryActive: {
        //     id: 'ABC123',
        //     name: '',
        //     todos: [],
        //     doing: [],
        //     completed: [],
        todoActive: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     description: '',
    },
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

        setActiveCategory: ( state, action ) => {
            state.categoryActive = action.payload
        },

        setCategories: (state, action ) => {
            state.categories = action.payload
        },
        
    }
});


// Action creators are generated for each case reducer function
export const { addNewCategory,
               savingNewCategory,
               setActiveCategory,
               setCategories,
            
            
            } = todosSlice.actions;