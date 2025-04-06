import { useEffect, useRef } from 'react';
import { useAuth } from '../context/useAuth';

const MAX_RETRIES = 5

export function useChatSocket(conversationId, onMessageReceived) {
  const { tokens } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !tokens?.access) return;

    function connectWebSocket(url, retries = 0) {
      const socket = new WebSocket(url);
    
      socket.onclose = (e) => {
        if (retries < MAX_RETRIES) {
          console.warn(`WebSocket closed. Retrying (${retries + 1})...`);
          setTimeout(() => connectWebSocket(url, retries + 1), 1000);
        } else {
          console.error('WebSocket failed after max retries: ', e);
        }
      };
    
      return socket;
    }

    const socket = connectWebSocket(`ws://localhost:8000/ws/chat/${conversationId}/?token=${tokens.access}`);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log(`Connected to conversation ${conversationId}`);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message' && onMessageReceived) {
        onMessageReceived(data);
      }
    };

    socket.onerror = (e) => {
      console.error('WebSocket error:', e);
    };

    socket.onclose = () => {
      console.log(`Disconnected from conversation ${conversationId}`);
    };

    return () => {
      socket.close();
    };
  }, [conversationId, tokens?.access, onMessageReceived]);

  const sendMessage = (text) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'message', message: text }));
    }
  };

  return { sendMessage };
}

