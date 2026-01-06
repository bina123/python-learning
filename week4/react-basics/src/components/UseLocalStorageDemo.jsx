// src/components/UseLocalStorageDemo.jsx
import useLocalStorage from '../hooks/useLocalStorage';

function UseLocalStorageDemo() {
    const [name, setName, removeName] = useLocalStorage('user-name', '');
    const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
    const [todos, setTodos, removeTodos] = useLocalStorage('todos', []);
    const [settings, setSettings, removeSettings] = useLocalStorage('settings', {
        notifications: true,
        darkMode: false,
    });

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h1>useLocalStorage Hook Demo</h1>

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
                    <li>✅ Automatically syncs to localStorage</li>
                    <li>✅ Works like useState</li>
                    <li>✅ Syncs across tabs/windows</li>
                    <li>✅ Handles JSON serialization</li>
                    <li>✅ Provides remove function</li>
                </ul>
            </div>

            {/* String Example */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '1rem',
                }}
            >
                <h3>String Value:</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        marginBottom: '0.5rem',
                    }}
                />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={removeName}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Clear Name
                    </button>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
                    Stored value: <strong>{name || '(empty)'}</strong>
                </p>
            </div>

            {/* Theme Toggle */}
            <div
                style={{
                    padding: '1.5rem',
                    background: theme === 'dark' ? '#2c3e50' : 'white',
                    color: theme === 'dark' ? 'white' : 'black',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '1rem',
                }}
            >
                <h3>Theme Toggle:</h3>
                <button
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: theme === 'dark' ? '#3498db' : '#2c3e50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Toggle Theme (Current: {theme})
                </button>
            </div>

            {/* Array Example */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '1rem',
                }}
            >
                <h3>Array (Todos):</h3>
                <button
                    onClick={() =>
                        setTodos([...todos, { id: Date.now(), text: `Todo ${todos.length + 1}` }])
                    }
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '0.5rem',
                    }}
                >
                    Add Todo
                </button>
                <button
                    onClick={removeTodos}
                    style={{
                        padding: '0.5rem 1rem',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Clear All
                </button>
                <div style={{ marginTop: '1rem' }}>
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            style={{
                                padding: '0.5rem',
                                background: '#f8f9fa',
                                borderRadius: '4px',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {todo.text}
                        </div>
                    ))}
                    {todos.length === 0 && (
                        <p style={{ color: '#7f8c8d' }}>No todos yet</p>
                    )}
                </div>
            </div>

            {/* Object Example */}
            <div
                style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <h3>Object (Settings):</h3>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={(e) =>
                                setSettings({ ...settings, notifications: e.target.checked })
                            }
                            style={{ marginRight: '0.5rem' }}
                        />
                        Enable Notifications
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            checked={settings.darkMode}
                            onChange={(e) =>
                                setSettings({ ...settings, darkMode: e.target.checked })
                            }
                            style={{ marginRight: '0.5rem' }}
                        />
                        Dark Mode
                    </label>
                </div>
                <pre
                    style={{
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: '4px',
                        overflow: 'auto',
                    }}
                >
                    {JSON.stringify(settings, null, 2)}
                </pre>
            </div>

            {/* Test Sync */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>💡 Test Cross-Tab Sync:</strong>
                <p style={{ marginTop: '0.5rem' }}>
                    Open this page in another tab and change values. They'll sync automatically!
                </p>
            </div>
        </div>
    );
}

export default UseLocalStorageDemo;