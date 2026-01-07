// src/components/forms/MultiStepForm.jsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';

function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: formData,
    });

    const totalSteps = 3;

    const nextStep = async () => {
        const isValid = await trigger(); // Validate current fields
        if (isValid) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const onSubmit = (data) => {
        setFormData({ ...formData, ...data });
        console.log('Complete form data:', { ...formData, ...data });
        alert('Form submitted successfully! Check console.');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1>Multi-Step Form</h1>

            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    {[1, 2, 3].map((num) => (
                        <div
                            key={num}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                color: step >= num ? '#3498db' : '#95a5a6',
                                fontWeight: step === num ? 'bold' : 'normal',
                            }}
                        >
                            Step {num}
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        height: '8px',
                        background: '#ecf0f1',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${(step / totalSteps) * 100}%`,
                            background: '#3498db',
                            transition: 'width 0.3s',
                        }}
                    />
                </div>
                <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#7f8c8d' }}>
                    Step {step} of {totalSteps}
                </p>
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
                {/* Step 1: Personal Info */}
                {step === 1 && (
                    <div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Personal Information</h2>

                        <FormField label="First Name *" error={errors.firstName}>
                            <input
                                {...register('firstName', { required: 'First name is required' })}
                                style={inputStyle(errors.firstName)}
                            />
                        </FormField>

                        <FormField label="Last Name *" error={errors.lastName}>
                            <input
                                {...register('lastName', { required: 'Last name is required' })}
                                style={inputStyle(errors.lastName)}
                            />
                        </FormField>

                        <FormField label="Email *" error={errors.email}>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email',
                                    },
                                })}
                                style={inputStyle(errors.email)}
                            />
                        </FormField>

                        <FormField label="Phone *" error={errors.phone}>
                            <input
                                type="tel"
                                {...register('phone', { required: 'Phone is required' })}
                                style={inputStyle(errors.phone)}
                            />
                        </FormField>
                    </div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                    <div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Address</h2>

                        <FormField label="Street Address *" error={errors.street}>
                            <input
                                {...register('street', { required: 'Street address is required' })}
                                style={inputStyle(errors.street)}
                            />
                        </FormField>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                            <FormField label="City *" error={errors.city}>
                                <input
                                    {...register('city', { required: 'City is required' })}
                                    style={inputStyle(errors.city)}
                                />
                            </FormField>

                            <FormField label="ZIP *" error={errors.zip}>
                                <input
                                    {...register('zip', { required: 'ZIP is required' })}
                                    style={inputStyle(errors.zip)}
                                />
                            </FormField>
                        </div>

                        <FormField label="Country *" error={errors.country}>
                            <select {...register('country', { required: 'Country is required' })} style={inputStyle(errors.country)}>
                                <option value="">Select country</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="ca">Canada</option>
                            </select>
                        </FormField>
                    </div>
                )}

                {/* Step 3: Preferences */}
                {step === 3 && (
                    <div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Preferences</h2>

                        <FormField label="Username *" error={errors.username}>
                            <input
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: { value: 3, message: 'Min 3 characters' },
                                })}
                                style={inputStyle(errors.username)}
                            />
                        </FormField>

                        <FormField label="Password *" error={errors.password}>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Min 8 characters' },
                                })}
                                style={inputStyle(errors.password)}
                            />
                        </FormField>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input type="checkbox" {...register('newsletter')} />
                                Subscribe to newsletter
                            </label>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                    type="checkbox"
                                    {...register('terms', { required: 'You must accept terms' })}
                                />
                                I accept the terms and conditions *
                            </label>
                            {errors.terms && (
                                <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                                    {errors.terms.message}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: '#95a5a6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Previous
                        </button>
                    )}

                    {step < totalSteps ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: '#3498db',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

function FormField({ label, error, children }) {
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                {label}
            </label>
            {children}
            {error && (
                <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    {error.message}
                </p>
            )}
        </div>
    );
}

function inputStyle(hasError) {
    return {
        width: '100%',
        padding: '0.75rem',
        border: `2px solid ${hasError ? '#e74c3c' : '#ddd'}`,
        borderRadius: '4px',
        fontSize: '1rem',
    };
}

export default MultiStepForm;