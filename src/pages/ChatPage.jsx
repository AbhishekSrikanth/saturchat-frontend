import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import { getMessages } from '../services/chat';
import { useChatSocket } from '../hooks/useChatSocket';
import NoConversationSelected from '../components/NoConversationSelected';
import SentBubble from '../components/SentBubble';
import ReceivedBubble from '../components/ReceivedBubble';
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

  if (!conversationId) return <NoConversationSelected />;

  return (
    <div className="flex flex-col h-full w-full max-h-full relative">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => {
            const isMine = msg.sender?.id === user.pk;
            const content = msg.encrypted_content || msg.message;
            const time = dayjs(msg.created_at || msg.timestamp).format('h:mm A');

            return isMine ? (
              <SentBubble key={msg.id || msg.message_id} text={content} time={time} />
            ) : (
              <ReceivedBubble key={msg.id || msg.message_id} text={content} time={time} />
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar pinned to bottom */}
      <form
        onSubmit={handleSend}
        className="mt-4 p-4 bg-white rounded-xl shadow-lg flex items-center gap-3 sticky bottom-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-full bg-gray-100 border border-gray-300 text-sm outline-none"
        />
        <button
          type="submit"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
        >
          &gt;
        </button>
      </form>


    </div>
  );
}