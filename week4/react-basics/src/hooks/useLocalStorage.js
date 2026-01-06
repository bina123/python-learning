// src/hooks/useLocalStorage.js

import { useState, useEffect, useCallback } from 'react';

/**
 * Advanced localStorage hook with sync across tabs
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {[value, setValue, remove]}
 */
function useLocalStorage(key, initialValue) {
    // Get initial value from localStorage or use initialValue
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Set value in localStorage and state
    const setValue = useCallback(
        (value) => {
            try {
                // Allow value to be a function like useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;

                setStoredValue(valueToStore);

                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    // Remove value from localStorage
    const remove = useCallback(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    // Sync across tabs/windows
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key && e.newValue) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error('Error parsing storage event:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    return [storedValue, setValue, remove];
}

export default useLocalStorage;