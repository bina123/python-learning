// src/hooks/useAuth.js

import { useState, useEffect } from 'react';

/**
 * Custom hook for authentication.
 * Manages login, logout, and token storage.
 */
function useAuth() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for saved token on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('access_token');
        if (savedToken) {
            setToken(savedToken);
            fetchProfile(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async (accessToken) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/profile/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                // Token invalid
                logout();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();

            // Save tokens
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);

            setToken(data.tokens.access);
            setUser(data.user);

            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        logout
    };
}

export default useAuth;