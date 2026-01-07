// src/components/HeavyChart.jsx
function HeavyChart() {
    return (
        <div
            style={{
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <h3>📊 Heavy Chart Component</h3>
            <div
                style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                }}
            >
                Simulated Chart
            </div>
            <p style={{ marginTop: '1rem', color: '#7f8c8d' }}>
                This component was lazy-loaded!
            </p>
        </div>
    );
}

export default HeavyChart;