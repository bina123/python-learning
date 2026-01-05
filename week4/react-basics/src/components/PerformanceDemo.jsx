// src/components/PerformanceDemo.jsx
import { useState, memo } from 'react';

// ❌ Without memo - always re-renders
function SlowComponent({ value }) {
    console.log('SlowComponent rendered');

    // Simulate slow operation
    let startTime = Date.now();
    while (Date.now() - startTime < 100) {
        // Block for 100ms
    }

    return (
        <div style={{
            padding: '1rem',
            background: '#f8d7da',
            borderRadius: '4px',
            marginBottom: '1rem'
        }}>
            <strong>❌ Without memo:</strong> Value is {value}
            <br />
            <small>This re-renders on EVERY parent update (slow!)</small>
        </div>
    );
}

// ✅ With memo - only re-renders when props change
const FastComponent = memo(function FastComponent({ value }) {
    console.log('FastComponent rendered');

    // Same slow operation
    let startTime = Date.now();
    while (Date.now() - startTime < 100) {
        // Block for 100ms
    }

    return (
        <div style={{
            padding: '1rem',
            background: '#d4edda',
            borderRadius: '4px',
            marginBottom: '1rem'
        }}>
            <strong>✅ With memo:</strong> Value is {value}
            <br />
            <small>This only re-renders when value changes (fast!)</small>
        </div>
    );
});

function PerformanceDemo() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>React.memo Demo</h1>

            <div style={{
                padding: '1rem',
                background: '#ecf0f1',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h3>Controls:</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <button
                        onClick={() => setCount(count + 1)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Increment Count: {count}
                    </button>

                    <button
                        onClick={() => setValue(value + 1)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Increment Value: {value}
                    </button>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                    💡 Click "Increment Count" - see which component re-renders in console
                </p>
            </div>

            <SlowComponent value={value} />
            <FastComponent value={value} />

            <div style={{
                padding: '1rem',
                background: '#fff3cd',
                borderRadius: '4px',
                marginTop: '2rem'
            }}>
                <strong>📊 Performance Difference:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Without memo: Re-renders on EVERY state change (slow)</li>
                    <li>With memo: Only re-renders when its props change (fast)</li>
                    <li>Open console to see re-render logs</li>
                </ul>
            </div>
        </div>
    );
}

export default PerformanceDemo;