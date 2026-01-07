// src/components/zustand/CounterDemo.jsx

import useCounterStore from '../../stores/counterStore';

function CounterDemo() {
    // ✅ Subscribe to specific state - only re-renders when count changes
    const count = useCounterStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);
    const incrementBy = useCounterStore((state) => state.incrementBy);
    const reset = useCounterStore((state) => state.reset);

    console.log('CounterDemo rendered'); // Check re-renders in console

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1>Zustand Counter Demo</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Why Zustand?</h3>
                <ul>
                    <li>✅ No Provider wrapper needed</li>
                    <li>✅ Simple API</li>
                    <li>✅ Selective subscriptions (no unnecessary re-renders)</li>
                    <li>✅ No boilerplate</li>
                    <li>✅ TypeScript support</li>
                </ul>
            </div>

            {/* Counter Display */}
            <div
                style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                }}
            >
                <div
                    style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: '#3498db',
                        marginBottom: '1rem',
                    }}
                >
                    {count}
                </div>
                <p style={{ color: '#7f8c8d' }}>Current Count</p>
            </div>

            {/* Controls */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                }}
            >
                <button
                    onClick={decrement}
                    style={{
                        padding: '1rem',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    -1
                </button>

                <button
                    onClick={increment}
                    style={{
                        padding: '1rem',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    +1
                </button>

                <button
                    onClick={() => incrementBy(5)}
                    style={{
                        padding: '1rem',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    +5
                </button>

                <button
                    onClick={() => incrementBy(10)}
                    style={{
                        padding: '1rem',
                        background: '#9b59b6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    +10
                </button>

                <button
                    onClick={reset}
                    style={{
                        padding: '1rem',
                        background: '#95a5a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        gridColumn: 'span 2',
                    }}
                >
                    Reset
                </button>
            </div>

            {/* Multiple Components Demo */}
            <div style={{ marginTop: '2rem' }}>
                <h3>Multiple Components Sharing State:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <CounterDisplay />
                    <CounterDisplay />
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                    👆 Both components read from the same store - no prop drilling!
                </p>
            </div>
        </div>
    );
}

// Separate component that also uses the store
function CounterDisplay() {
    const count = useCounterStore((state) => state.count);

    return (
        <div
            style={{
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                textAlign: 'center',
            }}
        >
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>
                {count}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                Synced automatically!
            </p>
        </div>
    );
}

export default CounterDemo;