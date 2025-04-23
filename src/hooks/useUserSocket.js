import { useEffect, useRef } from 'react';
import { useAuth } from '../context/useAuth';

export function useUserSocket(onConversationUpdated) {
  const { tokens, user } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!tokens?.access || !user?.id) return;

    const baseUrl = import.meta.env.VITE_WS_BASE_URL;
    const socketUrl = `${baseUrl}/ws/user/${user.id}/`;
    const socket = new WebSocket(socketUrl, ['access_token', tokens.access])
    socketRef.current = socket;

    const handleOpen = () => {
      console.log('[UserSocket] Connected');
    };

    const handleMessage = (event) => {
      console.log('[UserSocket] Raw message:', event.data);
    
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'conversation_updated' && onConversationUpdated) {
          console.log('[UserSocket] Triggering onConversationUpdated');
          onConversationUpdated(data);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    const handleError = (e) => {
      console.error('[UserSocket] Error:', e);
    };

    const handleClose = (e) => {
      console.log('[UserSocket] Closed:', e.code, e.reason);
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('error', handleError);
    socket.addEventListener('close', handleClose);

    return () => {
      console.log('[UserSocket] Cleaning up...');
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('close', handleClose);
      socket.close();
    };
  }, [tokens?.access, user?.id, onConversationUpdated]);
}
