// src/components/UseCallbackDemo.jsx
import { useState, useCallback, memo } from 'react';

// ❌ Without memo - always re-renders
function ButtonWithout({ onClick, children }) {
    console.log('ButtonWithout rendered:', children);
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.75rem 1.5rem',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0.5rem'
            }}
        >
            {children}
        </button>
    );
}

// ✅ With memo - but still re-renders because onClick is recreated!
const ButtonWithMemo = memo(function ButtonWithMemo({ onClick, children }) {
    console.log('ButtonWithMemo rendered:', children);
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.75rem 1.5rem',
                background: '#f39c12',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0.5rem'
            }}
        >
            {children}
        </button>
    );
});

// ✅✅ With memo + useCallback - perfect optimization!
const ButtonOptimized = memo(function ButtonOptimized({ onClick, children }) {
    console.log('ButtonOptimized rendered:', children);
    return (
        <button
            onClick={onClick}
            style={{
                padding: '0.75rem 1.5rem',
                background: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                margin: '0.5rem'
            }}
        >
            {children}
        </button>
    );
});

function UseCallbackDemo() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    // ❌ Recreated on every render
    const increment1 = () => {
        setCount1(c => c + 1);
    };

    // ❌ Still recreated on every render (memo doesn't help!)
    const increment2 = () => {
        setCount2(c => c + 1);
    };

    // ✅ Only created once, reused on every render
    const increment3 = useCallback(() => {
        setCount3(c => c + 1);
    }, []); // Empty deps = never recreated

    // Example with dependencies
    const [multiplier, setMultiplier] = useState(1);

    const incrementWithMultiplier = useCallback(() => {
        setCount3(c => c + multiplier);
    }, [multiplier]); // Recreated only when multiplier changes

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>useCallback Demo</h1>

            <div style={{
                padding: '1.5rem',
                background: '#ecf0f1',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h3>The Problem:</h3>
                <p style={{ marginTop: '0.5rem' }}>
                    Functions are recreated on every render. When passed as props to memoized
                    components, they cause unnecessary re-renders because the function reference changes.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                    <strong>Solution:</strong> useCallback memoizes the function, keeping the same
                    reference across renders.
                </p>
            </div>

            {/* Example 1: Without memo */}
            <div style={{
                padding: '1.5rem',
                background: '#f8d7da',
                borderRadius: '8px',
                marginBottom: '1rem'
            }}>
                <h3>❌ Without React.memo:</h3>
                <p>Count: {count1}</p>
                <ButtonWithout onClick={increment1}>
                    Click me (always re-renders)
                </ButtonWithout>
                <p style={{ fontSize: '0.9rem', color: '#721c24', marginTop: '0.5rem' }}>
                    This button re-renders on EVERY parent update, even if its props don't change.
                </p>
            </div>

            {/* Example 2: With memo, without useCallback */}
            <div style={{
                padding: '1.5rem',
                background: '#fff3cd',
                borderRadius: '8px',
                marginBottom: '1rem'
            }}>
                <h3>⚠️ With React.memo, without useCallback:</h3>
                <p>Count: {count2}</p>
                <ButtonWithMemo onClick={increment2}>
                    Click me (still re-renders!)
                </ButtonWithMemo>
                <p style={{ fontSize: '0.9rem', color: '#856404', marginTop: '0.5rem' }}>
                    React.memo doesn't help because onClick function is recreated on every render.
                    New function = new reference = props changed = re-render!
                </p>
            </div>

            {/* Example 3: With memo + useCallback */}
            <div style={{
                padding: '1.5rem',
                background: '#d4edda',
                borderRadius: '8px',
                marginBottom: '1rem'
            }}>
                <h3>✅ With React.memo + useCallback:</h3>
                <p>Count: {count3}</p>
                <ButtonOptimized onClick={increment3}>
                    Click me (optimized!)
                </ButtonOptimized>
                <p style={{ fontSize: '0.9rem', color: '#155724', marginTop: '0.5rem' }}>
                    Perfect! Function is memoized, so button only re-renders when count3 changes.
                </p>
            </div>

            {/* Example 4: useCallback with dependencies */}
            <div style={{
                padding: '1.5rem',
                background: '#d1ecf1',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h3>✅ useCallback with dependencies:</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <label>Multiplier:</label>
                    <input
                        type="number"
                        value={multiplier}
                        onChange={(e) => setMultiplier(Number(e.target.value))}
                        style={{
                            padding: '0.5rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            width: '100px'
                        }}
                    />
                </div>
                <p>Count: {count3}</p>
                <ButtonOptimized onClick={incrementWithMultiplier}>
                    Add {multiplier}
                </ButtonOptimized>
                <p style={{ fontSize: '0.9rem', color: '#0c5460', marginTop: '0.5rem' }}>
                    Function is recreated only when multiplier changes, not on every render.
                </p>
            </div>

            {/* Trigger re-renders */}
            <div style={{
                padding: '1.5rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h3>Test Re-renders:</h3>
                <p style={{ marginBottom: '1rem' }}>
                    Click this button to trigger a re-render and see which buttons above re-render:
                </p>
                <button
                    onClick={() => { }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Force Re-render (check console)
                </button>
                <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '1rem' }}>
                    Open console and click this button. See which buttons re-render:
                    <br />
                    • Red button (without memo): Always re-renders ❌
                    <br />
                    • Orange button (memo, no useCallback): Always re-renders ❌
                    <br />
                    • Green buttons (memo + useCallback): Never re-render ✅
                </p>
            </div>

            {/* Best Practices */}
            <div style={{
                padding: '1rem',
                background: '#fff3cd',
                borderRadius: '4px'
            }}>
                <strong>🎯 When to use useCallback:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Functions passed to memoized child components</li>
                    <li>Functions used in useEffect dependencies</li>
                    <li>Event handlers for expensive components</li>
                </ul>
                <br />
                <strong>❌ Don't use useCallback for:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Functions that aren't passed as props</li>
                    <li>Simple inline functions</li>
                    <li>Premature optimization</li>
                </ul>
            </div>
        </div>
    );
}

export default UseCallbackDemo;