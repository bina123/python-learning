// src/pages/AboutPage.jsx

function AboutPage() {
    return (
        <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px'
        }}>
            <h1>About This Project</h1>

            <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
                This is a full-stack blog application built with:
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginTop: '2rem'
            }}>
                <div style={{ padding: '1.5rem', background: '#ecf0f1', borderRadius: '8px' }}>
                    <h3>🐍 Backend</h3>
                    <ul style={{ marginTop: '1rem' }}>
                        <li>Django 5.x</li>
                        <li>Django REST Framework</li>
                        <li>JWT Authentication</li>
                        <li>PostgreSQL</li>
                    </ul>
                </div>

                <div style={{ padding: '1.5rem', background: '#ecf0f1', borderRadius: '8px' }}>
                    <h3>⚛️ Frontend</h3>
                    <ul style={{ marginTop: '1rem' }}>
                        <li>React 18</li>
                        <li>React Router</li>
                        <li>Custom Hooks</li>
                        <li>Vite</li>
                    </ul>
                </div>

                <div style={{ padding: '1.5rem', background: '#ecf0f1', borderRadius: '8px' }}>
                    <h3>✨ Features</h3>
                    <ul style={{ marginTop: '1rem' }}>
                        <li>Authentication</li>
                        <li>CRUD Operations</li>
                        <li>Search & Filter</li>
                        <li>Responsive Design</li>
                    </ul>
                </div>
            </div>

            <p style={{ marginTop: '2rem', color: '#7f8c8d' }}>
                Built during a 150-day intensive learning journey from PHP/Laravel to Python/Django/React.
            </p>
        </div>
    );
}

export default AboutPage;