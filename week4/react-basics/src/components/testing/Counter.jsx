// src/components/testing/Counter.jsx

import { useState } from 'react';

function Counter({ initialCount = 0 }) {
    const [count, setCount] = useState(initialCount);

    return (
        <div>
            <h2>Counter Component</h2>
            <p data-testid="count-display">Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
}

export default Counter;