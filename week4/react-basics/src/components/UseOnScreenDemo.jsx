// src/components/UseOnScreenDemo.jsx
import useOnScreen from '../hooks/useOnScreen';

function UseOnScreenDemo() {
    const [ref1, isVisible1] = useOnScreen({ threshold: 0.5 });
    const [ref2, isVisible2] = useOnScreen({ threshold: 0.5 });
    const [ref3, isVisible3] = useOnScreen({ threshold: 0.5 });

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>useOnScreen Hook Demo</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Scroll down to see elements appear!</h3>
                <p>Uses Intersection Observer API to detect visibility</p>
            </div>

            <div style={{ height: '50vh' }} />

            <div
                ref={ref1}
                style={{
                    padding: '3rem',
                    background: isVisible1 ? '#d4edda' : '#f8d7da',
                    borderRadius: '8px',
                    marginBottom: '50vh',
                    transition: 'all 0.5s ease',
                    transform: isVisible1 ? 'scale(1)' : 'scale(0.9)',
                    opacity: isVisible1 ? 1 : 0.5,
                }}
            >
                <h2>{isVisible1 ? '✅ I am visible!' : '👻 Scroll to see me'}</h2>
                <p>This element animates when it comes into view</p>
            </div>

            <div
                ref={ref2}
                style={{
                    padding: '3rem',
                    background: isVisible2 ? '#d1ecf1' : '#f8d7da',
                    borderRadius: '8px',
                    marginBottom: '50vh',
                    transition: 'all 0.5s ease',
                    transform: isVisible2 ? 'translateX(0)' : 'translateX(-100px)',
                    opacity: isVisible2 ? 1 : 0,
                }}
            >
                <h2>{isVisible2 ? '🎉 Surprise!' : '📦 Keep scrolling'}</h2>
                <p>Slides in from the left when visible</p>
            </div>

            <div
                ref={ref3}
                style={{
                    padding: '3rem',
                    background: isVisible3 ? '#fff3cd' : '#f8d7da',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    transition: 'all 0.5s ease',
                    transform: isVisible3 ? 'rotate(0deg)' : 'rotate(-10deg)',
                    opacity: isVisible3 ? 1 : 0,
                }}
            >
                <h2>{isVisible3 ? '🚀 You made it!' : '⬇️ Almost there'}</h2>
                <p>Rotates into view</p>
            </div>

            <div
                style={{
                    padding: '1rem',
                    background: '#e7f3ff',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>Use Cases:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                    <li>Lazy loading images</li>
                    <li>Infinite scroll</li>
                    <li>Analytics (track viewed content)</li>
                    <li>Animations on scroll</li>
                </ul>
            </div>
        </div>
    );
}

export default UseOnScreenDemo;