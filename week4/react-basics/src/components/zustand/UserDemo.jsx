// src/components/zustand/UserDemo.jsx

import { useState } from 'react';
import useUserStore from '../../stores/userStore';

function UserDemo() {
    const [loginForm, setLoginForm] = useState({ name: '', email: '' });

    const user = useUserStore((state) => state.user);
    const theme = useUserStore((state) => state.theme);
    const preferences = useUserStore((state) => state.preferences);
    const login = useUserStore((state) => state.login);
    const logout = useUserStore((state) => state.logout);
    const updateProfile = useUserStore((state) => state.updateProfile);
    const toggleTheme = useUserStore((state) => state.toggleTheme);
    const updatePreferences = useUserStore((state) => state.updatePreferences);

    const handleLogin = (e) => {
        e.preventDefault();
        login({
            id: Date.now(),
            name: loginForm.name,
            email: loginForm.email,
            avatar: `https://ui-avatars.com/api/?name=${loginForm.name}&background=random`,
        });
        setLoginForm({ name: '', email: '' });
    };

    const isDark = theme === 'dark';

    return (
        <div
            style={{
                maxWidth: '700px',
                margin: '2rem auto',
                background: isDark ? '#2c3e50' : '#fff',
                minHeight: '100vh',
                padding: '2rem',
                transition: 'background 0.3s',
            }}
        >
            <h1 style={{ color: isDark ? '#ecf0f1' : '#2c3e50' }}>
                User Store with Persistence
            </h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: isDark ? '#34495e' : '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    color: isDark ? '#ecf0f1' : '#2c3e50',
                }}
            >
                <h3>Features:</h3>
                <ul>
                    <li>✅ Persists to localStorage</li>
                    <li>✅ Survives page refresh</li>
                    <li>✅ Theme management</li>
                    <li>✅ User preferences</li>
                </ul>
            </div>

            {/* Theme Toggle */}
            <button
                onClick={toggleTheme}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: isDark ? '#3498db' : '#2c3e50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
            >
                {isDark ? '☀️' : '🌙'} Toggle Theme (Current: {theme})
            </button>

            {!user ? (
                /* Login Form */
                <form
                    onSubmit={handleLogin}
                    style={{
                        padding: '2rem',
                        background: isDark ? '#34495e' : 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                >
                    <h2 style={{ marginBottom: '1.5rem', color: isDark ? '#ecf0f1' : '#2c3e50' }}>
                        Login
                    </h2>

                    <div style={{ marginBottom: '1rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: isDark ? '#ecf0f1' : '#2c3e50',
                            }}
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={loginForm.name}
                            onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                color: isDark ? '#ecf0f1' : '#2c3e50',
                            }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </button>
                </form>
            ) : (
                /* User Profile */
                <div>
                    <div
                        style={{
                            padding: '2rem',
                            background: isDark ? '#34495e' : 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            marginBottom: '2rem',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <img
                                src={user.avatar}
                                alt={user.name}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                }}
                            />
                            <div>
                                <h2 style={{ marginBottom: '0.5rem', color: isDark ? '#ecf0f1' : '#2c3e50' }}>
                                    {user.name}
                                </h2>
                                <p style={{ color: isDark ? '#bdc3c7' : '#7f8c8d' }}>{user.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                            }}
                        >
                            Logout
                        </button>
                    </div>

                    {/* Preferences */}
                    <div
                        style={{
                            padding: '2rem',
                            background: isDark ? '#34495e' : 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h3 style={{ marginBottom: '1rem', color: isDark ? '#ecf0f1' : '#2c3e50' }}>
                            Preferences
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: isDark ? '#ecf0f1' : '#2c3e50',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={preferences.notifications}
                                    onChange={(e) =>
                                        updatePreferences({ notifications: e.target.checked })
                                    }
                                    style={{ width: '20px', height: '20px' }}
                                />
                                Enable Notifications
                            </label>

                            <label
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: isDark ? '#ecf0f1' : '#2c3e50',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={preferences.emailUpdates}
                                    onChange={(e) =>
                                        updatePreferences({ emailUpdates: e.target.checked })
                                    }
                                    style={{ width: '20px', height: '20px' }}
                                />
                                Email Updates
                            </label>

                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: isDark ? '#ecf0f1' : '#2c3e50',
                                    }}
                                >
                                    Language
                                </label>
                                <select
                                    value={preferences.language}
                                    onChange={(e) => updatePreferences({ language: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: '2px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Info */}
            <div
                style={{
                    padding: '1rem',
                    background: isDark ? '#16a085' : '#d4edda',
                    borderRadius: '4px',
                    marginTop: '2rem',
                    color: isDark ? '#ecf0f1' : '#155724',
                }}
            >
                <strong>💾 Persistence Active:</strong>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Try refreshing the page - your data will persist!
                </p>
            </div>
        </div>
    );
}

export default UserDemo;