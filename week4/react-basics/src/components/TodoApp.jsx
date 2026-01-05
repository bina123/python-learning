import { useState, useEffect } from "react";

function TodoApp() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: 'Learn React basics', completed: true },
            { id: 2, text: 'Build a Todo app', completed: false },
            { id: 3, text: 'Connect React to Django API', completed: false }
        ];
    });

    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e) => {
        e.preventDefault();

        if (inputValue.trim() == "") {
            alert('Please enter a todo!');
        }

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        }

        setTodos([...todos, newTodo]);
        setInputValue("");
    };

    const handleToggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleEditTodo = (id, newText) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        ))
    }

    const handleClearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    }

    const getFilterTods = () => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };

    const filteredTodos = getFilterTods();
    const activeCount = todos.filter(todo => !todo.completed).length;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                📝 My Todos
            </h1>

            {/* Add Todo Form */}
            <form onSubmit={handleAddTodo} style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="What needs to be done?"
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            fontSize: '1rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Add
                    </button>
                </div>
            </form>

            {/* Filter Buttons */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                justifyContent: 'center'
            }}>
                {['all', 'active', 'completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: filter === f ? '#3498db' : '#ecf0f1',
                            color: filter === f ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Todo List */}
            <div style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#7f8c8d' }}>
                        No todos to show
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                            onEdit={handleEditTodo}
                        />
                    ))
                )}
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
                padding: '0.5rem',
                fontSize: '0.9rem',
                color: '#7f8c8d'
            }}>
                <span>{activeCount} {activeCount === 1 ? 'item' : 'items'} left</span>
                {todos.some(todo => todo.completed) && (
                    <button
                        onClick={handleClearCompleted}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#e74c3c',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        }}
                    >
                        Clear completed
                    </button>
                )}
            </div>
        </div>
    );
}

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.text);

    const handleSubmitEdit = () => {
        if (editValue.trim()) {
            onEdit(todo.id, editValue);
            setIsEditing(false)
        }
    }

    const handleCancelEdit = () => {
        setEditValue(todo.text);
        setIsEditing(false)
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid #ecf0f1',
            gap: '1rem'
        }}>
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />

            {/* Todo Text */}
            {isEditing ? (
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()}
                    autoFocus
                    style={{
                        flex: 1,
                        padding: '0.5rem',
                        fontSize: '1rem',
                        border: '1px solid #3498db',
                        borderRadius: '4px'
                    }}
                />
            ) : (
                <span
                    onDoubleClick={() => setIsEditing(true)}
                    style={{
                        flex: 1,
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#95a5a6' : '#2c3e50',
                        cursor: 'pointer'
                    }}
                >
                    {todo.text}
                </span>
            )}

            {/* Action Buttons */}
            {isEditing ? (
                <>
                    <button
                        onClick={handleSubmitEdit}
                        style={{
                            padding: '0.25rem 0.75rem',
                            background: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ✓
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        style={{
                            padding: '0.25rem 0.75rem',
                            background: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ✕
                    </button>
                </>
            ) : (
                <button
                    onClick={() => onDelete(todo.id)}
                    style={{
                        padding: '0.25rem 0.75rem',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Delete
                </button>
            )}
        </div>
    );
}

export default TodoApp