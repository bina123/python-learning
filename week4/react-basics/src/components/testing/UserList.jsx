// src/components/testing/UserList.jsx

import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div role="status">Loading users...</div>;
    }

    if (error) {
        return (
            <div>
                <div role="alert">Error: {error}</div>
                <button onClick={fetchUsers}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} data-testid={`user-${user.id}`}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;