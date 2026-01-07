// src/components/HeavyTable.jsx
function HeavyTable() {
    const data = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        value: Math.floor(Math.random() * 1000),
    }));

    return (
        <div
            style={{
                padding: '2rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <h3>📋 Heavy Table Component</h3>
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '1rem',
                }}
            >
                <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>
                            ID
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #dee2e6' }}>
                            Name
                        </th>
                        <th style={{ padding: '0.75rem', textAlign: 'right', border: '1px solid #dee2e6' }}>
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.id}</td>
                            <td style={{ padding: '0.75rem', border: '1px solid #dee2e6' }}>{row.name}</td>
                            <td
                                style={{
                                    padding: '0.75rem',
                                    border: '1px solid #dee2e6',
                                    textAlign: 'right',
                                }}
                            >
                                ${row.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{ marginTop: '1rem', color: '#7f8c8d' }}>
                This component was lazy-loaded!
            </p>
        </div>
    );
}

export default HeavyTable;