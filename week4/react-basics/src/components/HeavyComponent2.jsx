// src/components/HeavyComponent2.jsx
function HeavyComponent2() {
    return (
        <div style={{
            padding: '2rem',
            background: '#f3e5f5',
            borderRadius: '8px'
        }}>
            <h2>Heavy Component 2</h2>
            <p>This is another lazy-loaded component!</p>
            <p>Bundle size: ~50KB (example)</p>
        </div>
    );
}

export default HeavyComponent2;