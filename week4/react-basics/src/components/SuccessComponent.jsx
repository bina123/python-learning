// src/components/SuccessComponent.jsx
function SuccessComponent() {
    return (
        <div
            style={{
                padding: '2rem',
                background: '#d4edda',
                borderRadius: '8px',
                textAlign: 'center',
            }}
        >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h2>Success!</h2>
            <p>Component loaded successfully.</p>
        </div>
    );
}

export default SuccessComponent;