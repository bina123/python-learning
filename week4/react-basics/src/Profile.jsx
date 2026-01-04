// src/Profile.jsx
import { useState } from 'react';

function Profile() {
    // Multiple state variables
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent page reload
        setSubmitted(true);
    };

    const handleReset = () => {
        setName('');
        setAge('');
        setCity('');
        setSubmitted(false);
    };

    return (
        <div className="container">
            <h1>User Profile</h1>

            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            Name:
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            Age:
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                            City:
                        </label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                            required
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <h2>Profile Submitted!</h2>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>City:</strong> {city}</p>
                    <button onClick={handleReset}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default Profile;