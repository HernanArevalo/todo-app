import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
    name: 'categories',
    initialState: {
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
        ],
        categorieActive: null,
        todoActive: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = todosSlice.actions;