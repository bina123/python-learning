// src/components/UseMediaQueryDemo.jsx
import useMediaQuery from '../hooks/useMediaQuery';

function UseMediaQueryDemo() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
    const isDesktop = useMediaQuery('(min-width: 1025px)');
    const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const isPortrait = useMediaQuery('(orientation: portrait)');

    const getDeviceType = () => {
        if (isMobile) return 'Mobile';
        if (isTablet) return 'Tablet';
        if (isDesktop) return 'Desktop';
        return 'Unknown';
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>useMediaQuery Hook Demo</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Current Device:</h3>
                <div style={{ fontSize: '3rem', textAlign: 'center', margin: '1rem 0' }}>
                    {isMobile && '📱'}
                    {isTablet && '💻'}
                    {isDesktop && '🖥️'}
                </div>
                <p style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {getDeviceType()}
                </p>
                <p style={{ textAlign: 'center', color: '#7f8c8d', marginTop: '0.5rem' }}>
                    Resize your browser window to see changes!
                </p>
            </div>

            {/* Media Query Status */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}
            >
                <StatusCard label="Mobile (≤768px)" active={isMobile} />
                <StatusCard label="Tablet (769-1024px)" active={isTablet} />
                <StatusCard label="Desktop (≥1025px)" active={isDesktop} />
                <StatusCard label="Dark Mode" active={isDarkMode} />
                <StatusCard label="Portrait" active={isPortrait} />
            </div>

            {/* Responsive Layout Example */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <h3>Responsive Layout Example:</h3>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                        gap: '1rem',
                        marginTop: '1rem',
                    }}
                >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div
                            key={num}
                            style={{
                                padding: '2rem',
                                background: '#3498db',
                                color: 'white',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                            }}
                        >
                            {num}
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '1rem', color: '#7f8c8d', fontSize: '0.9rem' }}>
                    Layout adapts based on screen size:
                    <br />
                    • Mobile: 1 column
                    <br />
                    • Tablet: 2 columns
                    <br />• Desktop: 3 columns
                </p>
            </div>
        </div>
    );
}

function StatusCard({ label, active }) {
    return (
        <div
            style={{
                padding: '1rem',
                background: active ? '#d4edda' : '#f8d7da',
                borderRadius: '8px',
                textAlign: 'center',
                border: `2px solid ${active ? '#27ae60' : '#e74c3c'}`,
            }}
        >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {active ? '✅' : '❌'}
            </div>
            <div style={{ fontWeight: 'bold', color: active ? '#155724' : '#721c24' }}>
                {label}
            </div>
        </div>
    );
}

export default UseMediaQueryDemo;