// src/components/websockets/ChatRoom.jsx

import { useState, useEffect, useRef } from 'react';
import useWebSocket from '../../hooks/useWebsocket';

function ChatRoom() {
    const [roomName, setRoomName] = useState('general');
    const [currentRoom, setCurrentRoom] = useState('general');
    const [username, setUsername] = useState(
        localStorage.getItem('username') || 'User' + Math.floor(Math.random() * 1000)
    );
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const wsUrl = `ws://127.0.0.1:8000/ws/chat/${currentRoom}/`;
    const { isConnected, messages, error, sendMessage, clearMessages } =
        useWebSocket(wsUrl);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Save username
    useEffect(() => {
        localStorage.setItem('username', username);
    }, [username]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() && isConnected) {
            sendMessage({
                message: inputMessage,
                username: username,
            });
            setInputMessage('');
        }
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomName.trim()) {
            clearMessages();
            setCurrentRoom(roomName);
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '2rem auto' }}>
            <h1>🔴 Live Chat Room</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>WebSocket Chat:</h3>
                <ul>
                    <li>✅ Real-time messaging</li>
                    <li>✅ Multiple chat rooms</li>
                    <li>✅ Instant delivery (no polling!)</li>
                    <li>✅ Multiple users supported</li>
                </ul>
            </div>

            {/* Connection Status */}
            <div
                style={{
                    padding: '1rem',
                    background: isConnected ? '#d4edda' : '#f8d7da',
                    color: isConnected ? '#155724' : '#721c24',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span style={{ fontSize: '1.5rem' }}>
                    {isConnected ? '🟢' : '🔴'}
                </span>
                <strong>
                    {isConnected ? 'Connected to chat!' : 'Disconnected'}
                </strong>
                {error && <span> - Error: {error}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '1rem' }}>
                {/* Sidebar */}
                <div>
                    {/* User Settings */}
                    <div
                        style={{
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            marginBottom: '1rem',
                        }}
                    >
                        <h3 style={{ marginBottom: '1rem' }}>Your Name:</h3>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '2px solid #ddd',
                                borderRadius: '4px',
                            }}
                        />
                    </div>

                    {/* Room Selector */}
                    <div
                        style={{
                            padding: '1.5rem',
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h3 style={{ marginBottom: '1rem' }}>Change Room:</h3>
                        <form onSubmit={handleJoinRoom}>
                            <input
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder="Enter room name"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: '2px solid #ddd',
                                    borderRadius: '4px',
                                    marginBottom: '0.5rem',
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    background: '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                            >
                                Join Room
                            </button>
                        </form>

                        <div style={{ marginTop: '1rem' }}>
                            <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
                                Current Room:
                            </p>
                            <div
                                style={{
                                    padding: '0.5rem',
                                    background: '#e7f3ff',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                #{currentRoom}
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#7f8c8d' }}>
                            <strong>Try these rooms:</strong>
                            <div style={{ marginTop: '0.5rem' }}>
                                {['general', 'tech', 'random'].map((room) => (
                                    <button
                                        key={room}
                                        onClick={() => {
                                            setRoomName(room);
                                            clearMessages();
                                            setCurrentRoom(room);
                                        }}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '0.5rem',
                                            margin: '0.25rem 0',
                                            background: currentRoom === room ? '#3498db' : '#f8f9fa',
                                            color: currentRoom === room ? 'white' : '#2c3e50',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                        }}
                                    >
                                        #{room}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '600px',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            padding: '1.5rem',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >
                        {messages.length === 0 ? (
                            <div
                                style={{
                                    textAlign: 'center',
                                    color: '#7f8c8d',
                                    padding: '3rem',
                                }}
                            >
                                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</p>
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index}>
                                    {msg.type === 'connection_established' ? (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: '0.5rem',
                                                background: '#e7f3ff',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem',
                                                color: '#0066cc',
                                            }}
                                        >
                                            {msg.message}
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                padding: '1rem',
                                                background:
                                                    msg.username === username ? '#e7f3ff' : '#f8f9fa',
                                                borderRadius: '8px',
                                                alignSelf:
                                                    msg.username === username ? 'flex-end' : 'flex-start',
                                                maxWidth: '70%',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '0.5rem',
                                                }}
                                            >
                                                <strong
                                                    style={{
                                                        color:
                                                            msg.username === username ? '#0066cc' : '#2c3e50',
                                                    }}
                                                >
                                                    {msg.username}
                                                </strong>
                                                <span
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        color: '#7f8c8d',
                                                    }}
                                                >
                                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div>{msg.message}</div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={handleSendMessage}
                        style={{
                            padding: '1.5rem',
                            borderTop: '1px solid #ecf0f1',
                            display: 'flex',
                            gap: '0.5rem',
                        }}
                    >
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                            disabled={!isConnected}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: '2px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '1rem',
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!isConnected || !inputMessage.trim()}
                            style={{
                                padding: '0.75rem 2rem',
                                background:
                                    !isConnected || !inputMessage.trim() ? '#95a5a6' : '#27ae60',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor:
                                    !isConnected || !inputMessage.trim()
                                        ? 'not-allowed'
                                        : 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>

            {/* Instructions */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>🎯 Try This:</strong>
                <ol style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    <li>Open this page in TWO browser tabs/windows</li>
                    <li>Send a message from one tab</li>
                    <li>Watch it appear INSTANTLY in the other tab!</li>
                    <li>Try different rooms (#tech, #general, #random)</li>
                </ol>
            </div>
        </div>
    );
}

export default ChatRoom;