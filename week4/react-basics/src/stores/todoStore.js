// src/stores/todoStore.js

import { create } from 'zustand';

/**
 * Advanced todo store with async actions
 */

const useTodoStore = create((set, get) => ({
    // State
    todos: [],
    filter: 'all', // all, active, completed
    loading: false,
    error: null,

    // Actions
    addTodo: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now(),
                    text,
                    completed: false,
                    createdAt: new Date().toISOString(),
                },
            ],
        })),

    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })),

    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),

    editTodo: (id, newText) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            ),
        })),

    setFilter: (filter) => set({ filter }),

    clearCompleted: () =>
        set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
        })),

    // Async action - fetch todos from API
    fetchTodos: async () => {
        set({ loading: true, error: null });

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const mockTodos = [
                { id: 1, text: 'Learn Zustand', completed: true, createdAt: new Date().toISOString() },
                { id: 2, text: 'Build awesome app', completed: false, createdAt: new Date().toISOString() },
                { id: 3, text: 'Deploy to production', completed: false, createdAt: new Date().toISOString() },
            ];

            set({ todos: mockTodos, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Computed values using get()
    getFilteredTodos: () => {
        const { todos, filter } = get();

        if (filter === 'active') {
            return todos.filter((todo) => !todo.completed);
        }
        if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        }
        return todos;
    },

    getStats: () => {
        const { todos } = get();
        return {
            total: todos.length,
            active: todos.filter((t) => !t.completed).length,
            completed: todos.filter((t) => t.completed).length,
        };
    },
}));

export default useTodoStore;