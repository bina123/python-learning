// src/hooks/useCounter.test.js

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from './useCounter';

describe('useCounter Hook', () => {
    it('initializes with default value of 0', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.count).toBe(0);
    });

    it('initializes with custom value', () => {
        const { result } = renderHook(() => useCounter(10));

        expect(result.current.count).toBe(10);
    });

    it('increments count', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.increment();
        });

        expect(result.current.count).toBe(1);
    });

    it('decrements count', () => {
        const { result } = renderHook(() => useCounter(5));

        act(() => {
            result.current.decrement();
        });

        expect(result.current.count).toBe(4);
    });

    it('resets to initial value', () => {
        const { result } = renderHook(() => useCounter(10));

        act(() => {
            result.current.increment();
            result.current.increment();
        });

        expect(result.current.count).toBe(12);

        act(() => {
            result.current.reset();
        });

        expect(result.current.count).toBe(10);
    });

    it('sets value directly', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.setValue(100);
        });

        expect(result.current.count).toBe(100);
    });

    it('handles multiple operations', () => {
        const { result } = renderHook(() => useCounter(0));

        act(() => {
            result.current.increment(); // 1
            result.current.increment(); // 2
            result.current.decrement(); // 1
            result.current.setValue(10); // 10
            result.current.increment(); // 11
        });

        expect(result.current.count).toBe(11);
    });
});