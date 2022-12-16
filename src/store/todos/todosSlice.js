import { createSlice } from '@reduxjs/toolkit';


export const todosSlice = createSlice({
    name: 'categories',
    initialState: {
        isSaving: false,
        messageSaved: '',
        categories: [],
        activeCategory: null,
        // activeCategory: {
        //     id: 'ABC123',
        //     name: '',
        //     todos: []
        // }
        activeTodo: null,
        // activeTodo: {
        //     id: 'ABC123',
        //     title: '',
        //     description: '',
        //     type: ''
    },
    reducers: {
        isSaving: (state, action ) => {
            state.isSaving = true
        },

        notSaving: (state, action ) => {
            state.isSaving = false
        },

        addNewCategory: (state, action ) => {
            state.categories.push({
                name: action.payload.name,
                id: action.payload.id,
                todo: [],
                doing: [],
                completed: []
            })   
        },

        savingNewCategory: ( state ) => {
            state.isSaving = true;
        },

        savingActiveTodo: ( state, action ) => {
            console.log(state.activeTodo)
            console.log(action.payload)
            state.activeTodo.title = action.payload.title;
            state.activeTodo.description = action.payload.description;
            console.log(state.activeTodo)
            // state.activeTodo = action.payload;
        },

        setActiveCategory: ( state, action ) => {
            state.activeCategory = action.payload
            
        },

        setActiveCategoryTodos: ( state, action ) => {
            state.activeCategory.todos = action.payload
        },     

        setActiveTodo: ( state, action ) => {
            state.activeTodo = action.payload
            state.activeCategory.todos.map((todo, i)=>{
                
                if (todo.id == state.activeTodo.id){
                    state.activeCategory.todos[i] = action.payload
                }
            })
        },

        setCategories: (state, action ) => {
            state.categories = action.payload
        },

        setNewTodo: (state,action) => {
            console.log('setNewTodo')
            state.activeCategory.todos.push( action.payload )
        },
        

    }
});

// Action creators are generated for each case reducer function
export const { 
                isSaving,
                notSaving,
                addNewCategory,
                savingNewCategory,
                savingActiveTodo,
                setActiveCategory,
                setActiveCategoryTodos,
                setActiveTodo,
                setCategories,
                setNewTodo,
            } = todosSlice.actions;