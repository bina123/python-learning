// src/components/HeavyComponent1.jsx
function HeavyComponent1() {
    return (
        <div style={{
            padding: '2rem',
            background: '#e3f2fd',
            borderRadius: '8px'
        }}>
            <h2>Heavy Component 1</h2>
            <p>This component was loaded dynamically!</p>
            <p>In a real app, this could be:</p>
            <ul>
                <li>A complex chart library</li>
                <li>A rich text editor</li>
                <li>A video player</li>
            </ul>
        </div>
    );
}

export default HeavyComponent1;