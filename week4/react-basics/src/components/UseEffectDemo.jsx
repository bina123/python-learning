import { useState, useEffect } from "react";

function UserEffectDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    useEffect(() => {
        console.log('Runs on every render');
    });

    useEffect(() => {
        console.log("Runs ONCE when component mounts")
    }, [])

    useEffect(() => {
        console.log('Runs when count changes:', count);
    }, [count]);

    useEffect(() => {
        console.log('Runs when name changes:', name)
    }, [name]);

    return (
        <div>
            <h2>useEffect Dependency Demo</h2>
            <div style={{ marginBottom: '1rem' }}>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <p>Name: {name}</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '0.5rem' }}
                />
            </div>

            <p style={{ color: '#7f8c8d' }}>Check browser console!</p>
        </div>
    );
}

export default UserEffectDemo;