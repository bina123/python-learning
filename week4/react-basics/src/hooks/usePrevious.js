// src/hooks/usePrevious.js

import { useRef, useEffect } from 'react';

/**
 * Hook to track previous value
 * 
 * @param {any} value - Value to track
 * @returns {any} - Previous value
 */
function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;