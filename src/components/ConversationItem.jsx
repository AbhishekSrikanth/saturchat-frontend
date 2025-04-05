import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function ConversationItem({ conversation }) {
  const { user } = useAuth();

  let displayName = 'Unnamed Chat';

  // Determine display name
  if (conversation.is_group) {
    displayName = conversation.name || 'Unnamed Group';
  } else {
    const otherParticipant = conversation.participants.find(
      (p) => p.user.id !== user.pk
    );
    displayName = otherParticipant?.user.username ?? 'Unknown User';
  }

  const lastMessage = conversation.last_message?.encrypted_content ?? '';

  return (
    <NavLink
      to={`/chat/${conversation.id}`}
      className={({ isActive }) =>
        `block px-4 py-2 rounded text-sm ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
        }`
      }
    >
      <div className="font-medium truncate">{displayName}</div>
      {lastMessage && (
        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {lastMessage}
        </div>
      )}
    </NavLink>
  );
}
