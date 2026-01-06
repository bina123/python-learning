// src/hooks/useAsync.js

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Advanced async hook for data fetching
 * Final working version for React 18
 */
function useAsync(asyncFunction, immediate = true) {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Track execution to prevent double-run in Strict Mode
    const executedRef = useRef(false);

    // Execute the async function
    const execute = useCallback(
        async (...params) => {
            console.log('🔄 useAsync execute called');
            setStatus('pending');
            setData(null);
            setError(null);

            try {
                const response = await asyncFunction(...params);
                console.log('✅ useAsync success:', response);

                // ✅ Always update state (removed mountedRef check here)
                setData(response);
                setStatus('success');

                return response;
            } catch (err) {
                console.error('❌ useAsync error:', err);

                // ✅ Always update state
                setError(err);
                setStatus('error');

                throw err;
            }
        },
        [asyncFunction]
    );

    // Reset to idle state
    const reset = useCallback(() => {
        setStatus('idle');
        setData(null);
        setError(null);
        executedRef.current = false;
    }, []);

    // Execute on mount if immediate is true
    useEffect(() => {
        // Prevent double execution in React 18 Strict Mode
        if (immediate && !executedRef.current) {
            executedRef.current = true;
            execute();
        }
    }, []); // Empty deps - only run once

    return {
        execute,
        reset,
        status,
        data,
        error,
        isIdle: status === 'idle',
        isPending: status === 'pending',
        isSuccess: status === 'success',
        isError: status === 'error',
    };
}

export default useAsync;