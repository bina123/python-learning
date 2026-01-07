// src/stores/userStore.js

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * User store with localStorage persistence
 * Data survives page refresh!
 */

const useUserStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,
            theme: 'light',
            preferences: {
                notifications: true,
                emailUpdates: false,
                language: 'en',
            },

            // Actions
            login: (userData) => set({ user: userData }),

            logout: () => set({ user: null }),

            updateProfile: (updates) =>
                set((state) => ({
                    user: { ...state.user, ...updates },
                })),

            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),

            updatePreferences: (newPrefs) =>
                set((state) => ({
                    preferences: { ...state.preferences, ...newPrefs },
                })),

            // Computed
            isAuthenticated: () => !!get().user,
        }),
        {
            name: 'user-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),

            // Optional: only persist specific fields
            partialize: (state) => ({
                user: state.user,
                theme: state.theme,
                preferences: state.preferences,
            }),
        }
    )
);

export default useUserStore;