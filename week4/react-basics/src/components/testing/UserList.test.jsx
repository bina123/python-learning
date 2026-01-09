// src/components/testing/UserList.test.jsx

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import UserList from './UserList';

// Mock fetch globally
global.fetch = vi.fn();

describe('UserList Component', () => {
    beforeEach(() => {
        // Reset mock before each test
        fetch.mockReset();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('shows loading state initially', () => {
        fetch.mockImplementation(() => new Promise(() => { })); // Never resolves

        render(<UserList />);

        expect(screen.getByRole('status')).toHaveTextContent('Loading users...');
    });

    it('displays users when fetch succeeds', async () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsers,
        });

        render(<UserList />);

        // Wait for loading to finish
        await waitFor(() => {
            expect(screen.queryByRole('status')).not.toBeInTheDocument();
        });

        // Check if users are displayed
        expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
        expect(screen.getByTestId('user-1')).toBeInTheDocument();
        expect(screen.getByTestId('user-2')).toBeInTheDocument();
    });

    it('displays error message when fetch fails', async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
        });

        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(
                /failed to fetch users/i
            );
        });

        // Check if retry button exists
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('displays error when network error occurs', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/network error/i);
        });
    });

    it('refetches users when retry button is clicked', async () => {
        // First call fails
        fetch.mockRejectedValueOnce(new Error('Failed'));

        render(<UserList />);

        await waitFor(() => {
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });

        // Second call succeeds
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsers,
        });

        const retryButton = screen.getByRole('button', { name: /retry/i });
        retryButton.click();

        await waitFor(() => {
            expect(screen.getByText(/john doe/i)).toBeInTheDocument();
        });
    });

    it('calls fetch with correct URL', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [],
        });

        render(<UserList />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'https://jsonplaceholder.typicode.com/users'
            );
        });
    });
});