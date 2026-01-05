// src/components/UseMemoDemo.jsx
import { useState, useMemo } from 'react';

function UseMemoDemo() {
    const [count, setCount] = useState(0);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('');

    // Generate items
    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 10000; i++) {
            newItems.push({
                id: i,
                name: `Item ${i}`,
                price: Math.random() * 100,
                category: ['Electronics', 'Books', 'Clothing', 'Food'][Math.floor(Math.random() * 4)]
            });
        }
        setItems(newItems);
    };

    // ❌ Without useMemo - recalculates on EVERY render
    const expensiveCalculationWithout = () => {
        console.log('❌ Expensive calculation WITHOUT useMemo running...');
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
            sum += i;
        }
        return sum;
    };

    // ✅ With useMemo - only recalculates when dependencies change
    const expensiveCalculationWith = useMemo(() => {
        console.log('✅ Expensive calculation WITH useMemo running...');
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
            sum += i;
        }
        return sum;
    }, []); // Empty deps = only runs once

    // Filter items (expensive operation)
    // ❌ Without useMemo - filters on EVERY render
    const filteredItemsWithout = items.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    // ✅ With useMemo - only filters when items or filter changes
    const filteredItemsWith = useMemo(() => {
        console.log('Filtering items...');
        return items.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]); // Only re-run when items or filter changes

    // Calculate stats (expensive)
    const stats = useMemo(() => {
        console.log('Calculating stats...');
        if (items.length === 0) return null;

        return {
            total: items.length,
            avgPrice: items.reduce((sum, item) => sum + item.price, 0) / items.length,
            maxPrice: Math.max(...items.map(i => i.price)),
            minPrice: Math.min(...items.map(i => i.price)),
            byCategory: items.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + 1;
                return acc;
            }, {})
        };
    }, [items]);

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>useMemo Demo</h1>

            <div style={{
                padding: '1rem',
                background: '#ecf0f1',
                borderRadius: '8px',
                marginBottom: '2rem'
            }}>
                <h3>Controls:</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                        onClick={generateItems}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Generate 10,000 Items
                    </button>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#7f8c8d', marginTop: '1rem' }}>
                    💡 Click "Increment Count" and watch console - useMemo prevents recalculations!
                </p>
            </div>

            {/* Results */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div style={{ padding: '1rem', background: '#f8d7da', borderRadius: '8px' }}>
                    <h3>❌ Without useMemo</h3>
                    <p>Result: {expensiveCalculationWithout()}</p>
                    <small>Runs on EVERY render</small>
                </div>

                <div style={{ padding: '1rem', background: '#d4edda', borderRadius: '8px' }}>
                    <h3>✅ With useMemo</h3>
                    <p>Result: {expensiveCalculationWith}</p>
                    <small>Cached - only runs once</small>
                </div>
            </div>

            {/* Items Section */}
            {items.length > 0 && (
                <>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>Filter Items:</h3>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Search items..."
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                fontSize: '1rem',
                                border: '1px solid #ddd',
                                borderRadius: '4px'
                            }}
                        />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                            Showing {filteredItemsWith.length} of {items.length} items
                        </p>
                    </div>

                    {/* Stats */}
                    {stats && (
                        <div style={{
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            marginBottom: '2rem'
                        }}>
                            <h3>Statistics (useMemo cached):</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem',
                                marginTop: '1rem'
                            }}>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
                                    <div style={{ color: '#7f8c8d' }}>Total Items</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                        ${stats.avgPrice.toFixed(2)}
                                    </div>
                                    <div style={{ color: '#7f8c8d' }}>Average Price</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                        ${stats.maxPrice.toFixed(2)}
                                    </div>
                                    <div style={{ color: '#7f8c8d' }}>Max Price</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                        ${stats.minPrice.toFixed(2)}
                                    </div>
                                    <div style={{ color: '#7f8c8d' }}>Min Price</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem' }}>
                                <strong>By Category:</strong>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    {Object.entries(stats.byCategory).map(([cat, count]) => (
                                        <div
                                            key={cat}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#ecf0f1',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {cat}: {count}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Items List (first 20) */}
                    <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ padding: '1rem', borderBottom: '1px solid #ecf0f1' }}>
                            Items (showing first 20):
                        </h3>
                        {filteredItemsWith.slice(0, 20).map(item => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    borderBottom: '1px solid #ecf0f1'
                                }}
                            >
                                <span>{item.name}</span>
                                <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
                                    ${item.price.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Info Box */}
            <div style={{
                padding: '1rem',
                background: '#fff3cd',
                borderRadius: '4px',
                marginTop: '2rem'
            }}>
                <strong>🎯 When to use useMemo:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Expensive calculations (filtering, sorting large arrays)</li>
                    <li>Creating objects/arrays that are passed as props</li>
                    <li>Dependencies that rarely change</li>
                </ul>
                <br />
                <strong>❌ Don't use useMemo for:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Simple calculations (adding numbers, string concatenation)</li>
                    <li>Values that change on every render anyway</li>
                    <li>Premature optimization (measure first!)</li>
                </ul>
            </div>
        </div>
    );
}

export default UseMemoDemo;