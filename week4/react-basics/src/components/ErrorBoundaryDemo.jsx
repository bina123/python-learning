// src/components/ErrorBoundaryDemo.jsx

import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

// Component that throws an error
function BuggyComponent() {
    const [count, setCount] = useState(0);

    if (count === 3) {
        // Simulate a bug!
        throw new Error('💥 Crash! Count reached 3');
    }

    return (
        <div
            style={{
                padding: '2rem',
                background: '#d4edda',
                borderRadius: '8px',
                marginBottom: '1rem',
            }}
        >
            <h3>Buggy Counter</h3>
            <p>Count: {count}</p>
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
                Increment (crashes at 3)
            </button>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#155724' }}>
                ⚠️ This will crash when count reaches 3
            </p>
        </div>
    );
}

// Component that randomly throws errors
function RandomErrorComponent() {
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
        throw new Error('🎲 Random error occurred!');
    }

    return (
        <div
            style={{
                padding: '2rem',
                background: '#fff3cd',
                borderRadius: '8px',
                marginBottom: '1rem',
            }}
        >
            <h3>Random Error Component</h3>
            <button
                onClick={() => setShouldError(true)}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#f39c12',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Trigger Random Error
            </button>
        </div>
    );
}

// Async error (API failure simulation)
function AsyncErrorComponent() {
    const [error, setError] = useState(null);

    const simulateAPIError = async () => {
        try {
            // Simulate API call that fails
            await new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('API request failed')), 1000);
            });
        } catch (err) {
            setError(err);
        }
    };

    if (error) {
        throw error; // Error boundaries catch this
    }

    return (
        <div
            style={{
                padding: '2rem',
                background: '#d1ecf1',
                borderRadius: '8px',
                marginBottom: '1rem',
            }}
        >
            <h3>Async Error Component</h3>
            <button
                onClick={simulateAPIError}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Trigger Async Error
            </button>
        </div>
    );
}

function ErrorBoundaryDemo() {
    const [showBuggy, setShowBuggy] = useState(true);
    const [showRandom, setShowRandom] = useState(true);
    const [showAsync, setShowAsync] = useState(true);

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>Error Boundary Demo</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>What are Error Boundaries?</h3>
                <ul>
                    <li>✅ Catch JavaScript errors in component tree</li>
                    <li>✅ Display fallback UI instead of crashing</li>
                    <li>✅ Log errors for debugging</li>
                    <li>✅ Prevent entire app from breaking</li>
                </ul>
            </div>

            {/* Controls */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                }}
            >
                <h3>Component Controls:</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={showBuggy}
                            onChange={(e) => setShowBuggy(e.target.checked)}
                        />
                        Buggy Counter
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={showRandom}
                            onChange={(e) => setShowRandom(e.target.checked)}
                        />
                        Random Error
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={showAsync}
                            onChange={(e) => setShowAsync(e.target.checked)}
                        />
                        Async Error
                    </label>
                </div>
            </div>

            {/* Example 1: Single Error Boundary (all components share one boundary) */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                }}
            >
                <h2>❌ Bad: Single Error Boundary</h2>
                <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
                    If any component crashes, ALL components disappear
                </p>

                <ErrorBoundary>
                    {showBuggy && <BuggyComponent />}
                    {showRandom && <RandomErrorComponent />}
                    {showAsync && <AsyncErrorComponent />}
                </ErrorBoundary>
            </div>

            {/* Example 2: Individual Error Boundaries (each component has its own boundary) */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <h2>✅ Good: Individual Error Boundaries</h2>
                <p style={{ marginBottom: '1rem', color: '#7f8c8d' }}>
                    Each component is isolated. If one crashes, others still work!
                </p>

                {showBuggy && (
                    <ErrorBoundary
                        fallback={
                            <div
                                style={{
                                    padding: '1rem',
                                    background: '#f8d7da',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <p>⚠️ Buggy Counter crashed but other components still work!</p>
                            </div>
                        }
                    >
                        <BuggyComponent />
                    </ErrorBoundary>
                )}

                {showRandom && (
                    <ErrorBoundary
                        fallback={
                            <div
                                style={{
                                    padding: '1rem',
                                    background: '#f8d7da',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <p>⚠️ Random Error Component crashed!</p>
                            </div>
                        }
                    >
                        <RandomErrorComponent />
                    </ErrorBoundary>
                )}

                {showAsync && (
                    <ErrorBoundary
                        fallback={
                            <div
                                style={{
                                    padding: '1rem',
                                    background: '#f8d7da',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                }}
                            >
                                <p>⚠️ Async Error Component crashed!</p>
                            </div>
                        }
                    >
                        <AsyncErrorComponent />
                    </ErrorBoundary>
                )}
            </div>

            {/* Info */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>🎯 Best Practices:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Wrap each major component/route with Error Boundary</li>
                    <li>Don't wrap the entire app in one boundary</li>
                    <li>Provide helpful error messages</li>
                    <li>Log errors to monitoring service (Sentry, LogRocket)</li>
                    <li>Offer recovery actions (retry, reload, go home)</li>
                </ul>
            </div>
        </div>
    );
}

export default ErrorBoundaryDemo;