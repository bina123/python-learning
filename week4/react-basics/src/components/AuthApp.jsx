// src/components/AuthApp.jsx
import { useState, useEffect } from 'react'
import Login from './Login'
import CreatePost from './CreatePost'

function AuthApp() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState([]);

    // Check if user is already logged in
    useEffect(() => {
        const savedToken = localStorage.getItem('access_token');
        if (savedToken) {
            setToken(savedToken);
            // Fetch user profile
            fetchProfile(savedToken);
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
                // Token invalid, logout
                handleLogout();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLogin = (userData, accessToken) => {
        setUser(userData);
        setToken(accessToken);
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                background: '#2c3e50',
                color: 'white',
                marginBottom: '2rem'
            }}>
                <div>
                    <h2>Welcome, {user.username}! 👋</h2>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        {user.email}
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Create Post Form */}
            <CreatePost token={token} onPostCreated={handlePostCreated} />

            {/* Display created posts */}
            {posts.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                    <h3>Your Posts</h3>
                    {posts.map(post => (
                        <div key={post.id} style={{
                            padding: '1rem',
                            background: 'white',
                            marginBottom: '1rem',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <h4>{post.title}</h4>
                            <p>{post.excerpt}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AuthApp;