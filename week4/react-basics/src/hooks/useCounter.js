// src/hooks/useCounter.js

import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => {
        setCount((c) => c + 1);
    }, []);

    const decrement = useCallback(() => {
        setCount((c) => c - 1);
    }, []);

    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);

    const setValue = useCallback((value) => {
        setCount(value);
    }, []);

    return {
        count,
        increment,
        decrement,
        reset,
        setValue,
    };
}

export default useCounter;