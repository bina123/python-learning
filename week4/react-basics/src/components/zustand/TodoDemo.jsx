// src/components/zustand/TodoDemo.jsx

import { useState } from 'react';
import useTodoStore from '../../stores/todoStore';

function TodoDemo() {
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    // Subscribe to specific slices
    const allTodos = useTodoStore((state) => state.getFilteredTodos);
    const todos = allTodos();
    const filter = useTodoStore((state) => state.filter);
    const loading = useTodoStore((state) => state.loading);
    // const stats = useTodoStore((state) => state.getStats());
    const getStats = useTodoStore(state => state.getStats);
    const stats = getStats();
    // Actions
    const addTodo = useTodoStore((state) => state.addTodo);
    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const deleteTodo = useTodoStore((state) => state.deleteTodo);
    const editTodo = useTodoStore((state) => state.editTodo);
    const setFilter = useTodoStore((state) => state.setFilter);
    const clearCompleted = useTodoStore((state) => state.clearCompleted);
    const fetchTodos = useTodoStore((state) => state.fetchTodos);

    const handleAdd = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    };

    const handleEdit = (id, text) => {
        setEditingId(id);
        setEditText(text);
    };

    const saveEdit = (id) => {
        if (editText.trim()) {
            editTodo(id, editText);
        }
        setEditingId(null);
        setEditText('');
    };

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <h1>Zustand Todo Demo</h1>

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
                    <li>✅ Global state management</li>
                    <li>✅ Async actions (fetch from API)</li>
                    <li>✅ Computed values (filtered todos, stats)</li>
                    <li>✅ No prop drilling</li>
                </ul>
            </div>

            {/* Fetch Button */}
            <button
                onClick={fetchTodos}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: loading ? '#95a5a6' : '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                }}
            >
                {loading ? 'Loading...' : 'Fetch Todos from API'}
            </button>

            {/* Stats */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}
            >
                <StatCard label="Total" value={stats.total} color="#3498db" />
                <StatCard label="Active" value={stats.active} color="#f39c12" />
                <StatCard label="Completed" value={stats.completed} color="#27ae60" />
            </div>

            {/* Add Todo Form */}
            <form onSubmit={handleAdd} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="What needs to be done?"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '1rem',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 2rem',
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Add
                    </button>
                </div>
            </form>

            {/* Filters */}
            <div
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1rem',
                }}
            >
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            background: filter === f ? '#3498db' : '#ecf0f1',
                            color: filter === f ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            fontWeight: filter === f ? 'bold' : 'normal',
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Todo List */}
            <div
                style={{
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: '1rem',
                }}
            >
                {todos.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#7f8c8d' }}>
                        No todos to show
                    </div>
                ) : (
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                borderBottom: '1px solid #ecf0f1',
                                gap: '1rem',
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            />

                            {editingId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                                    onBlur={() => saveEdit(todo.id)}
                                    autoFocus
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        border: '2px solid #3498db',
                                        borderRadius: '4px',
                                    }}
                                />
                            ) : (
                                <span
                                    onDoubleClick={() => handleEdit(todo.id, todo.text)}
                                    style={{
                                        flex: 1,
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        color: todo.completed ? '#95a5a6' : '#2c3e50',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {todo.text}
                                </span>
                            )}

                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{
                                    padding: '0.25rem 0.75rem',
                                    background: '#e74c3c',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Clear Completed */}
            {stats.completed > 0 && (
                <button
                    onClick={clearCompleted}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    Clear {stats.completed} completed {stats.completed === 1 ? 'todo' : 'todos'}
                </button>
            )}
        </div>
    );
}

function StatCard({ label, value, color }) {
    return (
        <div
            style={{
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center',
            }}
        >
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color }}>{value}</div>
            <div style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>{label}</div>
        </div>
    );
}

export default TodoDemo;