// src/stores/counterStore.js

import { create } from 'zustand';

/**
 * Simple counter store
 * 
 * Pattern:
 * - State: Define your state variables
 * - Actions: Define functions to update state
 */

const useCounterStore = create((set) => ({
    // State
    count: 0,

    // Actions
    increment: () => set((state) => ({ count: state.count + 1 })),

    decrement: () => set((state) => ({ count: state.count - 1 })),

    incrementBy: (amount) => set((state) => ({ count: state.count + amount })),

    reset: () => set({ count: 0 }),
}));

export default useCounterStore;