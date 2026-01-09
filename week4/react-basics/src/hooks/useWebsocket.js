// src/hooks/useWebSocket.js

import { useEffect, useRef, useState, useCallback } from 'react';

function useWebSocket(url) {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const ws = useRef(null);

    useEffect(() => {
        // Create WebSocket connection
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('✅ WebSocket Connected');
            setIsConnected(true);
            setError(null);
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('📨 Message received:', data);
            setMessages((prev) => [...prev, data]);
        };

        ws.current.onerror = (error) => {
            console.error('❌ WebSocket Error:', error);
            setError('WebSocket connection error');
        };

        ws.current.onclose = () => {
            console.log('🔌 WebSocket Disconnected');
            setIsConnected(false);
        };

        // Cleanup on unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url]);

    const sendMessage = useCallback((data) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not connected');
        }
    }, []);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return {
        isConnected,
        messages,
        error,
        sendMessage,
        clearMessages,
    };
}

export default useWebSocket;