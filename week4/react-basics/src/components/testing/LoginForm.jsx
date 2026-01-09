// src/components/testing/LoginForm.jsx

import { useState } from 'react';

function LoginForm({ onSubmit }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log("here");
            // Better regex: requires @ and . with text on both sides
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit({ email, password });
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2>Login</h2>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                    <span role="alert" className="error">
                        {errors.email}
                    </span>
                )}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password && (
                    <span role="alert" className="error">
                        {errors.password}
                    </span>
                )}
            </div>

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;