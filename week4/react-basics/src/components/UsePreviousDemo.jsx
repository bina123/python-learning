// src/components/UsePreviousDemo.jsx
import { useState } from 'react';
import usePrevious from '../hooks/usePrevious';

function UsePreviousDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');
    const previousCount = usePrevious(count);
    const previousName = usePrevious(name);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>usePrevious Hook Demo</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '1rem',
                }}
            >
                <h3>Counter:</h3>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        marginBottom: '1rem',
                    }}
                >
                    <button
                        onClick={() => setCount(count - 1)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        -
                    </button>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{count}</span>
                    <button
                        onClick={() => setCount(count + 1)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        +
                    </button>
                </div>

                <div
                    style={{
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '4px',
                    }}
                >
                    <div>Current: <strong>{count}</strong></div>
                    <div>Previous: <strong>{previousCount ?? 'N/A'}</strong></div>
                    {previousCount !== undefined && (
                        <div style={{ marginTop: '0.5rem', color: '#7f8c8d' }}>
                            {count > previousCount && '📈 Increased'}
                            {count < previousCount && '📉 Decreased'}
                            {count === previousCount && '➡️ No change'}
                        </div>
                    )}
                </div>
            </div>

            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <h3>Name Input:</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your name"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                    }}
                />

                <div
                    style={{
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '4px',
                    }}
                >
                    <div>Current: <strong>{name || '(empty)'}</strong></div>
                    <div>Previous: <strong>{previousName || '(empty)'}</strong></div>
                </div>
            </div>

            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>Use Cases:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Compare current vs previous value</li>
                    <li>Detect changes in props</li>
                    <li>Animations based on value changes</li>
                    <li>Undo/redo functionality</li>
                </ul>
            </div>
        </div>
    );
}

export default UsePreviousDemo;