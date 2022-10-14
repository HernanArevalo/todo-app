import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    ]};


export const todosSlice = createSlice({
    name: 'categories',
    initialState,
        //categorieActive: null,
        // todoActive: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
    
    reducers: {
        addCategory: (state, action ) => {

            state.categories.push({
                name: action.payload,
                todo: [],
                doing: [],
                completed: []
            })   
        },
    }
});


// Action creators are generated for each case reducer function
export const { addCategory } = todosSlice.actions;