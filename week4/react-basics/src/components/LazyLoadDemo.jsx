// src/components/LazyLoadDemo.jsx
import { useState, lazy, Suspense } from 'react';

// ✅ Lazy load components - only loaded when needed
const HeavyComponent1 = lazy(() => import('./HeavyComponent1'));
const HeavyComponent2 = lazy(() => import('./HeavyComponent2'));
const HeavyComponent3 = lazy(() => import('./HeavyComponent3'));

function LazyLoadDemo() {
    const [activeTab, setActiveTab] = useState('none');

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>Code Splitting & Lazy Loading</h1>

            <div style={{
                padding: '1.5rem',
                background: '#ecf0f1',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h3>What is Code Splitting?</h3>
                <p style={{ marginTop: '0.5rem' }}>
                    Instead of loading ALL JavaScript at once, we split code into chunks
                    and load them only when needed. This makes initial page load MUCH faster!
                </p>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem'
            }}>
                {['none', 'component1', 'component2', 'component3'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: activeTab === tab ? '#3498db' : '#ecf0f1',
                            color: activeTab === tab ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {tab === 'none' ? 'None' : `Component ${tab.slice(-1)}`}
                    </button>
                ))}
            </div>

            {/* Lazy loaded components */}
            <Suspense fallback={
                <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                    <p>Loading component...</p>
                </div>
            }>
                {activeTab === 'component1' && <HeavyComponent1 />}
                {activeTab === 'component2' && <HeavyComponent2 />}
                {activeTab === 'component3' && <HeavyComponent3 />}
            </Suspense>

            {activeTab === 'none' && (
                <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: '#f8f9fa',
                    borderRadius: '8px'
                }}>
                    <p>Select a component to load it dynamically!</p>
                </div>
            )}

            {/* Info */}
            <div style={{
                padding: '1rem',
                background: '#d4edda',
                borderRadius: '4px',
                marginTop: '2rem'
            }}>
                <strong>✅ Benefits:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Faster initial page load</li>
                    <li>Smaller JavaScript bundles</li>
                    <li>Components loaded on demand</li>
                    <li>Better performance for large apps</li>
                </ul>
            </div>
        </div>
    );
}

export default LazyLoadDemo;