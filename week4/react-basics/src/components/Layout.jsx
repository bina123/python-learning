// src/components/Layout.jsx
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Layout() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header/Navbar */}
            <header style={{
                background: '#2c3e50',
                color: 'white',
                padding: '1rem 2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        📝 My Blog
                    </Link>

                    <nav style={{ display: 'flex', gap: '2rem' }}>
                        <Link to="/" style={{
                            color: 'white',
                            textDecoration: 'none'
                        }}>
                            Home
                        </Link>
                        <Link to="/posts" style={{
                            color: 'white',
                            textDecoration: 'none'
                        }}>
                            Posts
                        </Link>
                        <Link to="/about" style={{
                            color: 'white',
                            textDecoration: 'none'
                        }}>
                            About
                        </Link>

                        {isAuthenticated ?
                            (<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <span style={{ color: '#ecf0f1', fontSize: '0.9rem' }}>
                                    👤 {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                            ) :
                            (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <Link
                                        to="/login"
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#3498db',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        style={{
                                            padding: '0.5rem 1rem',
                                            background: '#27ae60',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )
                        }
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                flex: 1,
                maxWidth: '1200px',
                width: '100%',
                margin: '0 auto',
                padding: '2rem'
            }}>
                <Outlet /> {/* Child routes render here */}
            </main>

            {/* Footer */}
            <footer style={{
                background: '#34495e',
                color: 'white',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <p>© 2026 My Blog. Built with React + Django.</p>
                {isAuthenticated && (
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                        Logged in as {user.username}
                    </p>
                )}
            </footer>
        </div>
    );
}

export default Layout;