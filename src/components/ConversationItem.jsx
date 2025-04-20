import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Avatar from './Avatar';

export default function ConversationItem({ conversation }) {
  const { user } = useAuth();
  const location = useLocation();

  let displayName = 'Unnamed Chat';
  let avatarUser = null; // <-- to pass to <Avatar />

  if (conversation.is_group) {
    displayName = conversation.name || 'Unnamed Group';
    avatarUser = {
      username: conversation.name,
      avatar: conversation.avatar, // <- assume conversation.avatar exists
    };
  } else {
    const other = conversation.participants.find(p => p.user.id !== user.id);
    displayName = other?.user?.username ?? 'Unknown User';
    avatarUser = other?.user;
  }

  let lastMessage = conversation.last_message?.encrypted_content ?? '';
  if (lastMessage.length > 25) {
    lastMessage = lastMessage.slice(0, 25) + '...';
  }

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
        {/* Avatar */}
        <Avatar user={avatarUser} />

        {/* Chat Info */}
        <div className="flex flex-col overflow-hidden">
          <span className="font-semibold text-sm truncate">{displayName}</span>
          {lastMessage && (
            <span className={`text-xs truncate ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
              {conversation.last_message?.sender?.id === user.id ? 'You: ' : ''}
              {lastMessage}
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
}
