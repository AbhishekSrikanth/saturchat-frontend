import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ConversationItem({ conversation }) {
  const { user } = useAuth();
  const location = useLocation();

  // Determine display name
  let displayName = 'Unnamed Chat';
  if (conversation.is_group) {
    displayName = conversation.name || 'Unnamed Group';
  } else {
    const other = conversation.participants.find(p => p.user.id !== user.pk);
    displayName = other?.user?.username ?? 'Unknown User';
  }

  const lastMessage = conversation.last_message?.encrypted_content ?? '';
  const isActive = location.pathname === `/chat/${conversation.id}`;

  return (
    <NavLink to={`/chat/${conversation.id}`}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
          isActive
            ? 'bg-black text-white'
            : 'hover:bg-gray-100 text-gray-800'
        }`}
      >
        {/* Avatar Placeholder */}
        <div className="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0" />

        {/* Chat Info */}
        <div className="flex flex-col overflow-hidden">
          <span className="font-semibold text-sm truncate">{displayName}</span>
          {lastMessage && (
            <span className={`text-xs truncate ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
              {conversation.last_message?.sender?.id === user.pk ? 'You: ' : ''}
              {lastMessage}
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
}
