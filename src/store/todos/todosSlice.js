import { createSlice } from '@reduxjs/toolkit';


export const todosSlice = createSlice({
    name: 'categories',
    initialState: {
        isSaving: false,
        messageSaved: '',
        categories: [],
        activeCategory: null,
        // ActiveCategory: {
        //     id: 'ABC123',
        //     name: '',
        //     todos: []
        // }
        activeTodo: null,
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
            state.activeCategory = action.payload
        },

        setActiveCategoryTodos: ( state, action ) => {
            state.activeCategory.todos = action.payload
        },     

        setActiveTodo: ( state, action ) => {
            state.activeTodo = action.payload

        },

        setCategories: (state, action ) => {
            state.categories = action.payload
        },

        setNewTodo: (state,action) => {
            console.log('setNewTodo')
            state.activeCategory.todos.push( action.payload )
        },
        deleteTodo: (state, action) => {



        }
    }
});

// Action creators are generated for each case reducer function
export const { addNewCategory,
               savingNewCategory,
               setActiveCategory,
               setActiveCategoryTodos,
               setActiveTodo,
               setCategories,
               setNewTodo
            
            
            } = todosSlice.actions;