import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import { getMessages } from '../services/chat';
import { useChatSocket } from '../hooks/useChatSocket';
import dayjs from 'dayjs';

export default function ChatPage() {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const onMessageReceived = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  // WebSocket setup
  const { sendMessage } = useChatSocket(conversationId, onMessageReceived);

  // REST fetch for initial history
  useEffect(() => {
    async function loadMessages() {
      setLoading(true);
      try {
        const data = await getMessages(conversationId);
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoading(false);
      }
    }

    if (conversationId) loadMessages();
  }, [conversationId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-full relative">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {loading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id || msg.message_id || Math.random()}
              className={`max-w-sm px-4 py-2 rounded-lg shadow ${
                msg.sender?.id === user.pk
                  ? 'bg-blue-600 text-white self-end ml-auto'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start'
              }`}
            >
              <div className="text-xs mb-1 font-semibold">
                {msg.sender?.username}{' '}
                <span className="text-[10px] text-gray-300 dark:text-gray-400">
                  {dayjs(msg.created_at || msg.timestamp).format('HH:mm')}
                </span>
              </div>
              <div>{msg.encrypted_content || msg.message}</div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar pinned to bottom */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-900"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}