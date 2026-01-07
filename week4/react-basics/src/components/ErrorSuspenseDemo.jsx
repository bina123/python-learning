// src/components/ErrorSuspenseDemo.jsx

import { Suspense, lazy, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

// Component that might fail to load
const UnreliableComponent = lazy(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 50% chance to fail
            if (Math.random() > 0.5) {
                resolve(import('./SuccessComponent'));
            } else {
                reject(new Error('Failed to load component'));
            }
        }, 2000);
    });
});

function LoadingFallback() {
    return (
        <div
            style={{
                padding: '2rem',
                textAlign: 'center',
                background: '#fff3cd',
                borderRadius: '8px',
            }}
        >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p>Loading component...</p>
        </div>
    );
}

function ErrorFallback() {
    return (
        <div
            style={{
                padding: '2rem',
                textAlign: 'center',
                background: '#f8d7da',
                borderRadius: '8px',
                color: '#721c24',
            }}
        >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
            <h3>Component Failed to Load</h3>
            <p>There was an error loading this component.</p>
        </div>
    );
}

function ErrorSuspenseDemo() {
    const [key, setKey] = useState(0);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>Error Boundary + Suspense</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Best Practice Pattern:</h3>
                <pre
                    style={{
                        background: '#2c3e50',
                        color: '#ecf0f1',
                        padding: '1rem',
                        borderRadius: '4px',
                        overflow: 'auto',
                    }}
                >
                    {`<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <YourComponent />
  </Suspense>
</ErrorBoundary>`}
                </pre>
                <p style={{ marginTop: '1rem', color: '#7f8c8d' }}>
                    Error Boundary catches errors, Suspense handles loading!
                </p>
            </div>

            <button
                onClick={() => setKey(key + 1)}
                style={{
                    padding: '0.75rem 1.5rem',
                    background: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '2rem',
                }}
            >
                Try Load Component (50% chance to fail)
            </button>

            {/* The Pattern */}
            <ErrorBoundary key={key} fallback={<ErrorFallback />}>
                <Suspense fallback={<LoadingFallback />}>
                    <UnreliableComponent />
                </Suspense>
            </ErrorBoundary>

            <div
                style={{
                    padding: '1rem',
                    background: '#d4edda',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>🎯 This pattern handles:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>✅ Loading states (Suspense)</li>
                    <li>✅ Load errors (Error Boundary)</li>
                    <li>✅ Runtime errors (Error Boundary)</li>
                    <li>✅ Graceful degradation</li>
                </ul>
            </div>
        </div>
    );
}

export default ErrorSuspenseDemo;