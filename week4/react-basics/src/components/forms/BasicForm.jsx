// src/components/forms/BasicForm.jsx

import { useForm } from 'react-hook-form';

function BasicForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Form data:', data);
        alert('Form submitted! Check console.');
        reset(); // Clear form
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1>Basic Form with React Hook Form</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Features:</h3>
                <ul>
                    <li>
                        ✅ Simple registration with {'{...register("name")}'}
                    </li>

                    <li>✅ Built-in validation</li>
                    <li>✅ Error handling</li>
                    <li>✅ Submit handling</li>
                    <li>✅ Form reset</li>
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
                {/* Name Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        htmlFor="name"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                        }}
                    >
                        Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters',
                            },
                        })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.name ? '#e74c3c' : '#ddd'}`,
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.name && (
                        <p
                            style={{
                                color: '#e74c3c',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                            }}
                        >
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        htmlFor="email"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                        }}
                    >
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.email ? '#e74c3c' : '#ddd'}`,
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.email && (
                        <p
                            style={{
                                color: '#e74c3c',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                            }}
                        >
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Age Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        htmlFor="age"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                        }}
                    >
                        Age
                    </label>
                    <input
                        id="age"
                        type="number"
                        {...register('age', {
                            min: {
                                value: 18,
                                message: 'Must be at least 18 years old',
                            },
                            max: {
                                value: 120,
                                message: 'Age must be less than 120',
                            },
                        })}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.age ? '#e74c3c' : '#ddd'}`,
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.age && (
                        <p
                            style={{
                                color: '#e74c3c',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                            }}
                        >
                            {errors.age.message}
                        </p>
                    )}
                </div>

                {/* Website Field (optional) */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        htmlFor="website"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                        }}
                    >
                        Website
                    </label>
                    <input
                        id="website"
                        type="url"
                        {...register('website', {
                            pattern: {
                                value: /^https?:\/\/.+/,
                                message: 'Must be a valid URL (http:// or https://)',
                            },
                        })}
                        placeholder="https://example.com"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.website ? '#e74c3c' : '#ddd'}`,
                            borderRadius: '4px',
                            fontSize: '1rem',
                        }}
                    />
                    {errors.website && (
                        <p
                            style={{
                                color: '#e74c3c',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                            }}
                        >
                            {errors.website.message}
                        </p>
                    )}
                </div>

                {/* Bio Field (textarea) */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        htmlFor="bio"
                        style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: 'bold',
                            color: '#2c3e50',
                        }}
                    >
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        {...register('bio', {
                            maxLength: {
                                value: 200,
                                message: 'Bio must be less than 200 characters',
                            },
                        })}
                        rows="4"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: `2px solid ${errors.bio ? '#e74c3c' : '#ddd'}`,
                            borderRadius: '4px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            resize: 'vertical',
                        }}
                    />
                    {errors.bio && (
                        <p
                            style={{
                                color: '#e74c3c',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                            }}
                        >
                            {errors.bio.message}
                        </p>
                    )}
                </div>

                {/* Terms Checkbox */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            cursor: 'pointer',
                        }}
                    >
                        <input
                            type="checkbox"
                            {...register('terms', {
                                required: 'You must accept the terms',
                            })}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ color: '#2c3e50' }}>
                            I accept the terms and conditions *
                        </span>
                    </label>
                    {errors.terms && (
                        <p
                            style={{
                                color: '#e74c3c',
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                            }}
                        >
                            {errors.terms.message}
                        </p>
                    )}
                </div>

                {/* Submit Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: isSubmitting ? '#95a5a6' : '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
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
                            fontSize: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>

            {/* Info */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>🎯 Validation Rules Used:</strong>
                <ul style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    <li>required - Field is required</li>
                    <li>minLength / maxLength - Character limits</li>
                    <li>min / max - Number range</li>
                    <li>pattern - Regex validation</li>
                </ul>
            </div>
        </div>
    );
}

export default BasicForm;