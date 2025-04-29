import { useEffect, useRef } from 'react';
import { useAuth } from '../context/useAuth';

export function useChatSocket(conversationId, onMessageReceived) {
  const { tokens } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!tokens?.access || !conversationId) return;

    const baseUrl = import.meta.env.VITE_WS_BASE_URL;
    const socketUrl = `${baseUrl}/ws/chat/${conversationId}/`;
    const socket = new WebSocket(socketUrl, ['access_token', tokens.access])
    socketRef.current = socket;

    let isUnmounted = false;

    const handleOpen = () => {
      if (isUnmounted) {
        socket.close();
        return;
      }
      console.log(`[ChatSocket] Connected to conversation ${conversationId}`);
    };

    const handleMessage = (event) => {

      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && onMessageReceived) {
          onMessageReceived(data);
        }
      } catch (err) {
        console.error('[ChatSocket] Error parsing message:', err);
      }
    };

    const handleError = (e) => {
      console.error('[ChatSocket] Error:', e);
    };

    const handleClose = (e) => {
      console.log(`[ChatSocket] Disconnected from conversation ${conversationId}:`, e.code, e.reason);
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('error', handleError);
    socket.addEventListener('close', handleClose);

    return () => {
      isUnmounted = true;
      console.log(`[ChatSocket] Cleaning up socket for conversation ${conversationId}`);
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('close', handleClose);
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
