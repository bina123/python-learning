// src/components/HeavyImage.jsx
function HeavyImage() {
    return (
        <div
            style={{
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <h3>🖼️ Heavy Image Component</h3>
            <div
                style={{
                    width: '100%',
                    height: '300px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                }}
            >
                📷 Simulated Image
            </div>
            <p style={{ marginTop: '1rem', color: '#7f8c8d' }}>
                This component was lazy-loaded!
            </p>
        </div>
    );
}

export default HeavyImage;