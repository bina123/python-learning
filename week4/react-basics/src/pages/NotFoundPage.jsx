// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div style={{
            textAlign: 'center',
            padding: '4rem 2rem'
        }}>
            <div style={{ fontSize: '5rem' }}>404</div>
            <h1>Page Not Found</h1>
            <p style={{ color: '#7f8c8d', marginTop: '1rem' }}>
                The page you're looking for doesn't exist.
            </p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    background: '#3498db',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                }}
            >
                Go Home
            </Link>
        </div>
    );
}

export default NotFoundPage;