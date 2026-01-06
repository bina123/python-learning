// src/hooks/useOnScreen.js

import { useState, useEffect, useRef } from 'react';

/**
 * Detect if element is visible on screen (Intersection Observer)
 * 
 * @param {Object} options - Intersection Observer options
 * @returns {[ref, isVisible]}
 */
function useOnScreen(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options, ref]);

    return [ref, isVisible];
}

export default useOnScreen;