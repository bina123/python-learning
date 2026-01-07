// src/components/SuspenseDemo.jsx

import { Suspense, lazy, useState } from 'react';

// Lazy load components
const HeavyChart = lazy(() => {
    // Simulate slow loading
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(import('./HeavyChart'));
        }, 2000);
    });
});

const HeavyTable = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(import('./HeavyTable'));
        }, 1500);
    });
});

const HeavyImage = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(import('./HeavyImage'));
        }, 1000);
    });
});

// Loading component
function LoadingFallback({ message = 'Loading...' }) {
    return (
        <div
            style={{
                padding: '3rem',
                textAlign: 'center',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '2px dashed #dee2e6',
            }}
        >
            <div
                style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    animation: 'spin 1s linear infinite',
                }}
            />
            <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>{message}</p>
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
}

function SuspenseDemo() {
    const [showChart, setShowChart] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showImage, setShowImage] = useState(false);

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>React Suspense Demo</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>What is Suspense?</h3>
                <ul>
                    <li>✅ Declarative loading states</li>
                    <li>✅ Better than isPending/isLoading</li>
                    <li>✅ Works with lazy-loaded components</li>
                    <li>✅ Prevents loading flashes</li>
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
                <h3>Load Components:</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setShowChart(true)}
                        disabled={showChart}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: showChart ? '#95a5a6' : '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: showChart ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {showChart ? '✓ Chart Loaded' : 'Load Chart (2s)'}
                    </button>

                    <button
                        onClick={() => setShowTable(true)}
                        disabled={showTable}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: showTable ? '#95a5a6' : '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: showTable ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {showTable ? '✓ Table Loaded' : 'Load Table (1.5s)'}
                    </button>

                    <button
                        onClick={() => setShowImage(true)}
                        disabled={showImage}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: showImage ? '#95a5a6' : '#f39c12',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: showImage ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {showImage ? '✓ Image Loaded' : 'Load Image (1s)'}
                    </button>

                    <button
                        onClick={() => {
                            setShowChart(false);
                            setShowTable(false);
                            setShowImage(false);
                        }}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Reset All
                    </button>
                </div>
            </div>

            {/* Suspense Components */}
            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Chart */}
                {showChart && (
                    <Suspense fallback={<LoadingFallback message="Loading Chart..." />}>
                        <HeavyChart />
                    </Suspense>
                )}

                {/* Table */}
                {showTable && (
                    <Suspense fallback={<LoadingFallback message="Loading Table..." />}>
                        <HeavyTable />
                    </Suspense>
                )}

                {/* Image */}
                {showImage && (
                    <Suspense fallback={<LoadingFallback message="Loading Image..." />}>
                        <HeavyImage />
                    </Suspense>
                )}
            </div>

            {/* Info */}
            <div
                style={{
                    padding: '1rem',
                    background: '#d4edda',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>✅ Benefits:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Cleaner than manual loading states</li>
                    <li>Automatic loading UI</li>
                    <li>Prevents content jumping</li>
                    <li>Works great with lazy loading</li>
                </ul>
            </div>
        </div>
    );
}

export default SuspenseDemo;