// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';

function Layout() {
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
            </footer>
        </div>
    );
}

export default Layout;