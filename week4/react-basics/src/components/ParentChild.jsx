import { useState } from "react";

function ParentChild() {
    const [message, setMessage] = useState('');

    return (
        <div>
            <h2>Parent Child communication</h2>

            {/* Child 1 sets the message */}
            <InputChild onMessageChange={setMessage} />

            {/* Child 2 displays the message */}
            <DisplayChild message={message} />
        </div>
    );
}

function InputChild({ onMessageChange }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onMessageChange(input);
        setInput('');
    }

    return (
        <div style={{
            padding: '1rem',
            background: '#e3f2fd',
            borderRadius: '4px',
            marginBottom: '1rem'
        }}>
            <h3>Input component</h3>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    style={{ padding: '0.5rem', marginRight: '0.5rem' }}
                />
                <button type="submit">Send to sibling</button>
            </form>
        </div>
    );
}

function DisplayChild({ message }) {
    return (
        <div style={{
            padding: '1rem',
            background: '#f3e5f5',
            borderRadius: '4px'
        }}>
            <h3>Display Component</h3>
            <p>Message from sibling: <strong>{message || 'No message yet'}</strong></p>
        </div>
    );
}

export default ParentChild;