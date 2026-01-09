// src/components/testing/Counter.test.jsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Counter from './Counter';

describe('Counter Component', () => {
    it('renders with initial count of 0', () => {
        render(<Counter />);

        // Check if counter displays 0
        expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 0');
    });

    it('renders with custom initial count', () => {
        render(<Counter initialCount={5} />);

        expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 5');
    });

    it('increments count when Increment button is clicked', () => {
        render(<Counter />);

        const incrementButton = screen.getByText('Increment');
        fireEvent.click(incrementButton);

        expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 1');
    });

    it('decrements count when Decrement button is clicked', () => {
        render(<Counter initialCount={5} />);

        const decrementButton = screen.getByText('Decrement');
        fireEvent.click(decrementButton);

        expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 4');
    });

    it('resets count to 0 when Reset button is clicked', () => {
        render(<Counter initialCount={10} />);

        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);

        expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 0');
    });

    it('handles multiple clicks correctly', () => {
        render(<Counter />);

        const incrementButton = screen.getByText('Increment');

        // Click increment 3 times
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);

        expect(screen.getByTestId('count-display')).toHaveTextContent('Count: 3');
    });
});