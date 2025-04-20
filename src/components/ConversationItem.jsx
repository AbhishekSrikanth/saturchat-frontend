// src/components/ConversationItem.jsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/useAuth';
import Avatar from './Avatar';
import ManageConversationModal from './manageConversation/ManageConversationModal';

export default function ConversationItem({ conversation, refreshConversations }) {
  const { user } = useAuth();
  const location = useLocation();
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  let displayName = 'Unnamed Chat';
  let avatarUser = null;

  if (conversation.is_group) {
    displayName = conversation.name || 'Unnamed Group';
    avatarUser = {
      username: conversation.name,
      avatar: conversation.avatar,
    };
  } else {
    const other = conversation.participants.find(p => p.user.id !== user.id);
    displayName = other?.user?.username ?? 'Unknown User';
    avatarUser = other?.user;
  }

  let lastMessage = conversation.last_message?.encrypted_content ?? '';
  if (lastMessage.length > 15) {
    lastMessage = lastMessage.slice(0, 15) + '...';
  }

  const isActive = location.pathname === `/chat/${conversation.id}`;

  return (
    <>
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg cursor-pointer transition relative ${
          isActive
            ? 'bg-black text-white'
            : 'hover:bg-gray-100 text-gray-800'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <NavLink to={`/chat/${conversation.id}`} className="flex items-center gap-3 flex-1 overflow-hidden">
          <Avatar user={avatarUser} />
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm truncate">{displayName}</span>
            {lastMessage && (
              <span className={`text-xs truncate ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                {conversation.last_message?.sender?.id === user.id ? 'You: ' : ''}
                {lastMessage}
              </span>
            )}
          </div>
        </NavLink>

        {hovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className={`${isActive ? 'text-white hover:text-gray-500' : 'text-gray-400 hover:text-black'} ml-2 p-1 rounded cursor-pointer`}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        )}
      </div>

      <ManageConversationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        conversation={conversation}
        refreshConversations={refreshConversations}
      />
    </>
  );
}
