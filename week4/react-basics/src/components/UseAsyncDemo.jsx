// src/components/UseAsyncDemo.jsx
import { useState } from 'react';
import useAsync from '../hooks/useAsync';

// Mock API functions with better error handling
const fetchUsers = async () => {
    console.log('🔄 fetchUsers called');

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ];

    console.log('✅ fetchUsers returning:', users);
    return users;
};

const fetchUserById = async (id) => {
    console.log('🔄 fetchUserById called with id:', id);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
    ];

    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        console.log('❌ User not found');
        throw new Error('User not found');
    }

    console.log('✅ fetchUserById returning:', user);
    return user;
};

const failingRequest = async () => {
    console.log('🔄 failingRequest called');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw new Error('This request always fails!');
};

function UseAsyncDemo() {
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Example 1: Auto-fetch on mount
    const usersAsync = useAsync(fetchUsers, true);

    // Example 2: Manual fetch with parameter
    const userAsync = useAsync(
        () => selectedUserId ? fetchUserById(selectedUserId) : Promise.resolve(null),
        false
    );

    // Example 3: Error handling
    const errorAsync = useAsync(failingRequest, false);

    // Debug logs
    console.log('usersAsync state:', {
        status: usersAsync.status,
        data: usersAsync.data,
        error: usersAsync.error,
        isPending: usersAsync.isPending,
        isSuccess: usersAsync.isSuccess,
        isError: usersAsync.isError
    });

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>useAsync Hook Demo</h1>

            {/* Debug Info */}
            <div
                style={{
                    padding: '1rem',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    marginBottom: '2rem',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem'
                }}
            >
                <strong>Debug Info:</strong>
                <div>Status: {usersAsync.status}</div>
                <div>isPending: {String(usersAsync.isPending)}</div>
                <div>isSuccess: {String(usersAsync.isSuccess)}</div>
                <div>isError: {String(usersAsync.isError)}</div>
                <div>Has Data: {String(!!usersAsync.data)}</div>
                {usersAsync.data && <div>Data Length: {usersAsync.data.length}</div>}
            </div>

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
                    <li>✅ Loading, error, success states</li>
                    <li>✅ Automatic or manual execution</li>
                    <li>✅ Prevents state updates on unmounted components</li>
                    <li>✅ Manual refetch</li>
                    <li>✅ Reset state</li>
                </ul>
            </div>

            {/* Example 1: Auto-fetch users */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                }}
            >
                <h2>Example 1: Auto-fetch on Mount</h2>

                <div style={{ marginBottom: '1rem' }}>
                    <button
                        onClick={() => {
                            console.log('🔄 Manual refetch triggered');
                            usersAsync.execute();
                        }}
                        disabled={usersAsync.isPending}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: usersAsync.isPending ? 'not-allowed' : 'pointer',
                            opacity: usersAsync.isPending ? 0.6 : 1,
                            marginRight: '0.5rem',
                        }}
                    >
                        {usersAsync.isPending ? 'Loading...' : 'Refetch Users'}
                    </button>
                    <button
                        onClick={() => {
                            console.log('🔄 Reset triggered');
                            usersAsync.reset();
                        }}
                        style={{
                            padding: '0.5rem 1rem',
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

                <div style={{ fontSize: '0.9rem', color: '#7f8c8d', marginBottom: '1rem' }}>
                    Status: <strong>{usersAsync.status}</strong>
                </div>

                {/* Loading State */}
                {usersAsync.isPending && (
                    <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        background: '#fff3cd',
                        borderRadius: '4px'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                        <p>Loading users...</p>
                    </div>
                )}

                {/* Error State */}
                {usersAsync.isError && (
                    <div
                        style={{
                            padding: '1rem',
                            background: '#f8d7da',
                            color: '#721c24',
                            borderRadius: '4px',
                            border: '1px solid #f5c6cb'
                        }}
                    >
                        <strong>❌ Error:</strong> {usersAsync.error?.message || 'Unknown error'}
                    </div>
                )}

                {/* Success State */}
                {usersAsync.isSuccess && usersAsync.data && (
                    <div>
                        <h3 style={{ color: '#27ae60' }}>✅ Users Loaded ({usersAsync.data.length}):</h3>
                        {usersAsync.data.map((user) => (
                            <div
                                key={user.id}
                                style={{
                                    padding: '1rem',
                                    background: '#f8f9fa',
                                    borderRadius: '4px',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <div>
                                    <strong>{user.name}</strong>
                                    <br />
                                    <small style={{ color: '#7f8c8d' }}>{user.email}</small>
                                </div>
                                <button
                                    onClick={() => {
                                        console.log('🔄 View details clicked for user:', user.id);
                                        setSelectedUserId(user.id);
                                        userAsync.execute();
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Idle State */}
                {usersAsync.isIdle && (
                    <div style={{
                        padding: '2rem',
                        textAlign: 'center',
                        background: '#e7f3ff',
                        borderRadius: '4px'
                    }}>
                        <p>Click "Refetch Users" to load data</p>
                    </div>
                )}
            </div>

            {/* Example 2: Manual fetch with parameter */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '2rem',
                }}
            >
                <h2>Example 2: Manual Fetch with Parameter</h2>

                {selectedUserId && (
                    <p style={{ marginBottom: '1rem' }}>
                        Selected User ID: <strong>{selectedUserId}</strong>
                    </p>
                )}

                {userAsync.isPending && (
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#fff3cd', borderRadius: '4px' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                        <p>Loading user details...</p>
                    </div>
                )}

                {userAsync.isError && (
                    <div
                        style={{
                            padding: '1rem',
                            background: '#f8d7da',
                            color: '#721c24',
                            borderRadius: '4px',
                        }}
                    >
                        Error: {userAsync.error?.message || 'Unknown error'}
                    </div>
                )}

                {userAsync.isSuccess && userAsync.data && (
                    <div
                        style={{
                            padding: '1.5rem',
                            background: '#d4edda',
                            borderRadius: '4px',
                        }}
                    >
                        <h3>✅ {userAsync.data.name}</h3>
                        <p>
                            <strong>Email:</strong> {userAsync.data.email}
                        </p>
                        <p>
                            <strong>Role:</strong> {userAsync.data.role}
                        </p>
                    </div>
                )}

                {!selectedUserId && !userAsync.isSuccess && (
                    <p style={{ color: '#7f8c8d' }}>Click "View Details" on a user above</p>
                )}
            </div>

            {/* Example 3: Error handling */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <h2>Example 3: Error Handling</h2>

                <button
                    onClick={() => {
                        console.log('🔄 Trigger error clicked');
                        errorAsync.execute();
                    }}
                    disabled={errorAsync.isPending}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: errorAsync.isPending ? 'not-allowed' : 'pointer',
                        opacity: errorAsync.isPending ? 0.6 : 1,
                        marginBottom: '1rem',
                    }}
                >
                    {errorAsync.isPending ? 'Loading...' : 'Trigger Error'}
                </button>

                {errorAsync.isPending && <p>Loading...</p>}

                {errorAsync.isError && (
                    <div
                        style={{
                            padding: '1rem',
                            background: '#f8d7da',
                            color: '#721c24',
                            borderRadius: '4px',
                            border: '1px solid #f5c6cb',
                        }}
                    >
                        <strong>❌ Error occurred:</strong>
                        <br />
                        {errorAsync.error?.message || 'Unknown error'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UseAsyncDemo;