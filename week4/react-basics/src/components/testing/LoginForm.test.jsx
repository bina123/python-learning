// src/components/testing/LoginForm.test.jsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
    it('renders login form', () => {
        render(<LoginForm onSubmit={() => { }} />);

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('allows user to type in inputs', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={() => { }} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('shows error when email is empty', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={() => { }} />);

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        });
    });

    it('shows error when email is invalid', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={() => { }} />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.clear(emailInput);
        await user.type(emailInput, 'notanemail');

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        const error = await screen.findByText(/Email is invalid/i);
        expect(error).toBeInTheDocument();

    });

    it('shows error when password is empty', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={() => { }} />);

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'test@example.com');

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    it('shows error when password is too short', async () => {
        const user = userEvent.setup();
        render(<LoginForm onSubmit={() => { }} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, '12345');

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(
                screen.getByText(/password must be at least 6 characters/i)
            ).toBeInTheDocument();
        });
    });

    it('calls onSubmit with form data when valid', async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();
        render(<LoginForm onSubmit={mockSubmit} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            });
        });
    });

    it('does not call onSubmit when form is invalid', async () => {
        const user = userEvent.setup();
        const mockSubmit = vi.fn();
        render(<LoginForm onSubmit={mockSubmit} />);

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockSubmit).not.toHaveBeenCalled();
        });
    });
}); 55