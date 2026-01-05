// src/pages/HomePage.jsx

function HomePage() {
    return (
        <div>
            <h1>Welcome to My Blog! 📝</h1>
            <p>This is a React + Django full-stack application.</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginTop: '2rem'
            }}>
                <div style={{
                    padding: '2rem',
                    background: '#3498db',
                    color: 'white',
                    borderRadius: '8px'
                }}>
                    <h2>📚 Learn</h2>
                    <p>Read articles about Python, Django, and React</p>
                </div>

                <div style={{
                    padding: '2rem',
                    background: '#27ae60',
                    color: 'white',
                    borderRadius: '8px'
                }}>
                    <h2>🚀 Build</h2>
                    <p>Create full-stack applications with modern tech</p>
                </div>

                <div style={{
                    padding: '2rem',
                    background: '#e74c3c',
                    color: 'white',
                    borderRadius: '8px'
                }}>
                    <h2>💡 Share</h2>
                    <p>Connect with developers and share knowledge</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;