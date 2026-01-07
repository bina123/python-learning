import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, and underscores allowed'),

    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    confirmPassword: z.string(),

    age: z
        .number({
            required_error: 'Age is required',
            invalid_type_error: 'Age must be a number',
        })
        .min(18, 'Must be at least 18 years old')
        .max(120, 'Age must be realistic'),

    phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),

    country: z.string().min(1, 'Please select a country'),

    newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

function ZodForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Validated data:', data);
        alert('Form submitted successfully! Check console.');
        reset();
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1>Zod Validation Form</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Why Zod?</h3>
                <ul>
                    <li>✅ Type-safe validation</li>
                    <li>✅ Complex validation rules</li>
                    <li>✅ Custom error messages</li>
                    <li>✅ Schema reusability</li>
                    <li>✅ TypeScript support</li>
                </ul>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                {/* Username */}
                <FormField label="Username *" error={errors.username}>
                    <input
                        type="text"
                        {...register('username')}
                        style={inputStyle(errors.username)}
                    />
                </FormField>

                {/* Email */}
                <FormField label="Email *" error={errors.email}>
                    <input
                        type="email"
                        {...register('email')}
                        style={inputStyle(errors.email)}
                    />
                </FormField>

                {/* Password */}
                <FormField
                    label="Password *"
                    error={errors.password}
                    hint="Min 8 chars, uppercase, lowercase, number, special char"
                >
                    <input
                        type="password"
                        {...register('password')}
                        style={inputStyle(errors.password)}
                    />
                </FormField>

                {/* Confirm Password */}
                <FormField label="Confirm Password *" error={errors.confirmPassword}>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        style={inputStyle(errors.confirmPassword)}
                    />
                </FormField>

                {/* Age */}
                <FormField label="Age *" error={errors.age}>
                    <input
                        type="number"
                        {...register('age', { valueAsNumber: true })}
                        style={inputStyle(errors.age)}
                    />
                </FormField>

                {/* Phone */}
                <FormField
                    label="Phone *"
                    error={errors.phone}
                    hint="Format: +1234567890"
                >
                    <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+1234567890"
                        style={inputStyle(errors.phone)}
                    />
                </FormField>

                {/* Country */}
                <FormField label="Country *" error={errors.country}>
                    <select {...register('country')} style={inputStyle(errors.country)}>
                        <option value="">Select a country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="in">India</option>
                    </select>
                </FormField>

                {/* Newsletter */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" {...register('newsletter')} />
                        <span>Subscribe to newsletter</span>
                    </label>
                </div>

                {/* Submit */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: isSubmitting ? '#95a5a6' : '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Register'}
                    </button>

                    <button
                        type="button"
                        onClick={() => reset()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

// Reusable FormField Component
function FormField({ label, error, hint, children }) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label
                style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                }}
            >
                {label}
            </label>
            {children}
            {hint && (
                <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '0.25rem' }}>
                    {hint}
                </p>
            )}
            {error && (
                <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {error.message}
                </p>
            )}
        </div>
    );
}

// Reusable input style
function inputStyle(hasError) {
    return {
        width: '100%',
        padding: '0.75rem',
        border: `2px solid ${hasError ? '#e74c3c' : '#ddd'}`,
        borderRadius: '4px',
        fontSize: '1rem',
    };
}

export default ZodForm;