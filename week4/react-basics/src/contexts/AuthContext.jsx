import { createContext, useState, useEffect, useContext } from "react";
import { API_ENDPOINTS } from "../config/api";
import { ThemeProvider } from "./ThemeContext";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

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
            const response = await fetch(API_ENDPOINTS.profile, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);

            logout();
        } finally {
            setLoading(false);
        }
    }

    const login = async (username, password) => {
        try {
            const response = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Invalid credentials');
            }

            const data = await response.json();

            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);

            setToken(data.tokens.access);
            setUser(data.user);

            return { success: true }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    const register = async (username, email, password, passwordConfirm) => {
        try {
            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    password_confirm: passwordConfirm
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(
                    error.username?.[0] ||
                    error.email?.[0] ||
                    error.password?.[0] ||
                    'Registration failed'
                );
            }

            const data = await response.json();

            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);

            setToken(data.tokens.access);
            setUser(data.user);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
    }

    return <AuthContext.Provider value={value}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </AuthContext.Provider>
};