// src/components/websockets/NotificationsDemo.jsx

import { useState, useEffect } from 'react';

function NotificationsDemo() {
    const [isConnected, setIsConnected] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Get auth token
        const token = localStorage.getItem('access_token');

        // Create WebSocket connection
        // Note: You'd need to implement JWT auth in Django Channels
        const websocket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/');

        websocket.onopen = () => {
            console.log('✅ Notifications Connected');
            setIsConnected(true);
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('🔔 Notification received:', data);

            setNotifications((prev) => [
                {
                    ...data,
                    id: Date.now(),
                    read: false,
                },
                ...prev,
            ]);

            // Show browser notification if permitted
            if (Notification.permission === 'granted') {
                new Notification(data.title, {
                    body: data.message,
                    icon: '🔔',
                });
            }
        };

        websocket.onerror = (error) => {
            console.error('❌ WebSocket Error:', error);
        };

        websocket.onclose = () => {
            console.log('🔌 Notifications Disconnected');
            setIsConnected(false);
        };

        setWs(websocket);

        return () => {
            websocket.close();
        };
    }, []);

    // Request notification permission
    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            console.log('Notification permission:', permission);
        }
    };

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    // Simulate notification (for testing)
    const triggerTestNotification = () => {
        const testNotif = {
            type: 'notification',
            title: 'Test Notification',
            message: `This is a test at ${new Date().toLocaleTimeString()}`,
            timestamp: new Date().toISOString(),
        };

        setNotifications((prev) => [
            {
                ...testNotif,
                id: Date.now(),
                read: false,
            },
            ...prev,
        ]);
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <h1>🔔 Live Notifications</h1>

            <div
                style={{
                    padding: '1.5rem',
                    background: '#ecf0f1',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                }}
            >
                <h3>Real-time Notifications:</h3>
                <ul>
                    <li>✅ Instant push notifications</li>
                    <li>✅ Browser notifications support</li>
                    <li>✅ User-specific channels</li>
                    <li>✅ No polling required!</li>
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
                    {isConnected
                        ? 'Connected to notifications!'
                        : 'Disconnected from notifications'}
                </strong>
            </div>

            {/* Actions */}
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                }}
            >
                <button
                    onClick={requestNotificationPermission}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Enable Browser Notifications
                </button>

                <button
                    onClick={triggerTestNotification}
                    style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Test Notification
                </button>

                <button
                    onClick={clearAll}
                    disabled={notifications.length === 0}
                    style={{
                        padding: '0.75rem 1rem',
                        background: notifications.length === 0 ? '#95a5a6' : '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: notifications.length === 0 ? 'not-allowed' : 'pointer',
                    }}
                >
                    Clear All
                </button>
            </div>

            {/* Notifications List */}
            <div
                style={{
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <div
                    style={{
                        padding: '1.5rem',
                        borderBottom: '1px solid #ecf0f1',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <h2 style={{ margin: 0 }}>Notifications</h2>
                    {unreadCount > 0 && (
                        <div
                            style={{
                                padding: '0.25rem 0.75rem',
                                background: '#e74c3c',
                                color: 'white',
                                borderRadius: '12px',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                            }}
                        >
                            {unreadCount} unread
                        </div>
                    )}
                </div>

                <div style={{ padding: '1rem' }}>
                    {notifications.length === 0 ? (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '3rem',
                                color: '#7f8c8d',
                            }}
                        >
                            <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔕</p>
                            <p>No notifications yet</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                Click "Test Notification" to see how it works!
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    style={{
                                        padding: '1rem',
                                        background: notif.read ? '#f8f9fa' : '#e7f3ff',
                                        borderLeft: notif.read
                                            ? '4px solid #95a5a6'
                                            : '4px solid #3498db',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => markAsRead(notif.id)}
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
                                                color: notif.read ? '#7f8c8d' : '#2c3e50',
                                            }}
                                        >
                                            {notif.title}
                                        </strong>
                                        <span style={{ fontSize: '0.75rem', color: '#7f8c8d' }}>
                                            {new Date(notif.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div style={{ color: notif.read ? '#7f8c8d' : '#2c3e50' }}>
                                        {notif.message}
                                    </div>
                                    {!notif.read && (
                                        <div
                                            style={{
                                                marginTop: '0.5rem',
                                                fontSize: '0.75rem',
                                                color: '#3498db',
                                            }}
                                        >
                                            Click to mark as read
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Note */}
            <div
                style={{
                    padding: '1rem',
                    background: '#fff3cd',
                    borderRadius: '4px',
                    marginTop: '2rem',
                }}
            >
                <strong>📝 Note:</strong>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    In production, notifications would be triggered by backend events like:
                    new comments, likes, mentions, orders, etc. This demo uses a test button
                    to simulate real notifications.
                </p>
            </div>
        </div>
    );
}

export default NotificationsDemo;