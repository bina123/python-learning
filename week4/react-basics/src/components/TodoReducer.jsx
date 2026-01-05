import { act, useReducer, useState } from "react";

const ACTIONS = {
    ADD_TODO: 'ADD_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    DELETE_TODO: 'DELETE_TODO',
    EDIT_TODO: 'EDIT_TODO',
    SET_FILTER: 'SET_FILTER',
    CLEAR_COMPLETED: 'CLEAR_COMPLETED'
}

function todoReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Date.now(),
                        text: action.payload,
                        completed: false,
                        createAt: new Date().toISOString()
                    }
                ]
            };
        case ACTIONS.TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case ACTIONS.DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };

        case ACTIONS.EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)
            };

        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };

        case ACTIONS.CLEAR_COMPLETED:
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            };

        default:
            return state;
    }
}

const intialState = {
    todos: [],
    filter: 'all' // all, active, completed
}

function TodoReducer() {
    const [state, dispatch] = useReducer(todoReducer, intialState);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const addTodo = (text) => {
        if (text.trim()) {
            dispatch({ type: ACTIONS.ADD_TODO, payload: text })
            setInput('');
        }
    };

    const toggleTodo = (id) => {
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
    }

    const deleteTodo = (id) => {
        dispatch({ type: ACTIONS.DELETE_TODO, payload: id })
    }

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    }

    const saveEdit = () => {
        if (editText.trim()) {
            dispatch({
                type: ACTIONS.EDIT_TODO,
                payload: { id: editingId, text: editText }
            })
            setEditingId(null)
            setEditText('');
        }
    }

    const setFilter = (filter) => {
        dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
    }

    const clearCompleted = () => {
        dispatch({ type: ACTIONS.CLEAR_COMPLETED })
    }

    const filteredTodos = state.todos.filter(todo => {
        if (state.filter == 'active') return !todo.completed;
        if (state.filter == 'completed') return todo.completed;
        return true;
    })

    const stats = {
        total: state.todos.length,
        active: state.todos.filter(t => !t.completed).length,
        completed: state.todos.filter(t => t.completed).length
    }

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h1 style={{ textAlign: 'center' }}>Todo App (useReducer)</h1>
            <div style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo(input)}
                    placeholder="What needs to be done?"
                    style={{
                        width: '100%',
                        padding: '1rem',
                        fontSize: '1rem',
                        border: '2px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
            </div>

            {/* Filters */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
                justifyContent: 'center'
            }}>
                {['all', 'active', 'completed'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilter(filter)}
                        style={{
                            padding: '0.5rem 1rem',
                            background: state.filter === filter ? '#3498db' : '#ecf0f1',
                            color: state.filter === filter ? 'white' : '#2c3e50',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Stats */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '1rem',
                background: '#f8f9fa',
                borderRadius: '8px',
                marginBottom: '1rem'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</div>
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Total</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
                        {stats.active}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Active</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
                        {stats.completed}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Completed</div>
                </div>
            </div>

            {/* Todo List */}
            <div style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                {filteredTodos.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#7f8c8d' }}>
                        No todos to show
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <div
                            key={todo.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                borderBottom: '1px solid #ecf0f1',
                                gap: '1rem'
                            }}
                        >
                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                            />

                            {/* Text */}
                            {editingId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                                    onBlur={saveEdit}
                                    autoFocus
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem',
                                        fontSize: '1rem',
                                        border: '2px solid #3498db',
                                        borderRadius: '4px'
                                    }}
                                />
                            ) : (
                                <span
                                    onDoubleClick={() => startEdit(todo)}
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

                            {/* Actions */}
                            {editingId !== todo.id && (
                                <button
                                    onClick={() => deleteTodo(todo.id)}
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
                    ))
                )}
            </div>

            {/* Clear Completed */}
            {stats.completed > 0 && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button
                        onClick={clearCompleted}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear {stats.completed} completed {stats.completed === 1 ? 'todo' : 'todos'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default TodoReducer;