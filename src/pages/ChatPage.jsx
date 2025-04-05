import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages } from '../services/chat';
import { useAuth } from '../context/useAuth';
import dayjs from 'dayjs';

export default function ChatPage() {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      try {
        const data = await getMessages(conversationId);
        setMessages(data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      } finally {
        setLoading(false);
      }
    }

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4">
        {loading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-sm px-4 py-2 rounded-lg shadow ${
                msg.sender.id === user.pk
                  ? 'bg-blue-600 text-white self-end'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start'
              }`}
            >
              <div className="text-xs mb-1 font-semibold">
                {msg.sender.username}{' '}
                <span className="text-[10px] text-gray-300 dark:text-gray-400">
                  {dayjs(msg.created_at).format('HH:mm')}
                </span>
              </div>
              <div>{msg.encrypted_content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
