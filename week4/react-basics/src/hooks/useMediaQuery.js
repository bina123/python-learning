// src/hooks/useMediaQuery.js

import { useState, useEffect } from 'react';

/**
 * Hook for responsive design with media queries
 * 
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the query matches
 */
function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        const media = window.matchMedia(query);

        // Update state if different
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        // Listen for changes
        const listener = (e) => setMatches(e.matches);
        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
}

export default useMediaQuery;