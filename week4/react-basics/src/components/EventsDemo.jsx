// src/components/EventsDemo.jsx
import { useState } from 'react'

function EventsDemo() {
    const [log, setLog] = useState([]);

    const addLog = (message) => {
        setLog([...log, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    // Click events
    const handleClick = () => {
        addLog('Button clicked');
    };

    const handleDoubleClick = () => {
        addLog('Button double-clicked');
    };

    // Mouse events
    const handleMouseEnter = () => {
        addLog('Mouse entered');
    };

    const handleMouseLeave = () => {
        addLog('Mouse left');
    };

    // Keyboard events
    const handleKeyPress = (e) => {
        addLog(`Key pressed: ${e.key}`);
    };

    // Focus events
    const handleFocus = () => {
        addLog('Input focused');
    };

    const handleBlur = () => {
        addLog('Input lost focus');
    };

    // Form events
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page reload
        addLog('Form submitted');
    };

    const handleChange = (e) => {
        addLog(`Input changed: ${e.target.value}`);
    };

    return (
        <div>
            <h2>Event Handling Demo</h2>

            {/* Click Events */}
            <div style={{ marginBottom: '1rem' }}>
                <button onClick={handleClick}>Click Me</button>
                <button onClick={handleDoubleClick} onDoubleClick={handleDoubleClick}>
                    Double Click Me
                </button>
            </div>

            {/* Mouse Events */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    padding: '1rem',
                    background: '#ecf0f1',
                    marginBottom: '1rem'
                }}
            >
                Hover over me!
            </div>

            {/* Keyboard Events */}
            <input
                type="text"
                onKeyDown={handleKeyPress}
                placeholder="Type something..."
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />

            {/* Focus Events */}
            <input
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Focus/blur me..."
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />

            {/* Form Events */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Type and submit..."
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                />
                <button type="submit">Submit</button>
            </form>

            {/* Event Log */}
            <div style={{
                marginTop: '2rem',
                background: '#2c3e50',
                color: 'white',
                padding: '1rem',
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto'
            }}>
                <h3>Event Log:</h3>
                {log.map((entry, index) => (
                    <div key={index} style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                        {entry}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsDemo;