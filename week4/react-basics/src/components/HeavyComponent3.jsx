// src/components/HeavyComponent3.jsx
function HeavyComponent3() {
    return (
        <div style={{
            padding: '2rem',
            background: '#fff3e0',
            borderRadius: '8px'
        }}>
            <h2>Heavy Component 3</h2>
            <p>Each component is in its own chunk!</p>
            <p>Only loaded when you click its tab.</p>
        </div>
    );
}

export default HeavyComponent3;