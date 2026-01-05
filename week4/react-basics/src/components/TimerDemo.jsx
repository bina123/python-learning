// src/components/TimerDemo.jsx
import { useState, useEffect } from 'react'

function TimerDemo() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        if (!isRunning) return;

        console.log('Setting up timer...');

        // Set up timer
        const timer = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);

        // Cleanup function - runs before next effect or unmount
        return () => {
            console.log('Cleaning up timer...');
            clearInterval(timer);
        };
    }, [isRunning]);

    return (
        <div>
            <h2>Timer: {seconds}s</h2>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => setSeconds(0)}>Reset</button>
        </div>
    );
}

export default TimerDemo;