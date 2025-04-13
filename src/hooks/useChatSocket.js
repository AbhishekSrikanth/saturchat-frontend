import { useEffect, useRef } from 'react';
import { useAuth } from '../context/useAuth';

const MAX_RETRIES = 5;

export function useChatSocket(conversationId, onMessageReceived) {
  const { tokens } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !tokens?.access) return;

    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${conversationId}/?token=${tokens.access}`);
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

    socket.onerror = (e) => console.error('Chat WebSocket error:', e);
    socket.onclose = () => console.log(`Disconnected from conversation ${conversationId}`);

    return () => {
      socket.close();
    };
  }, [conversationId, tokens?.access, onMessageReceived]);

  const sendMessage = (text) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'message', message: text }));
    }
  };

  return { sendMessage };
}
