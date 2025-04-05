import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewChatModal from './NewChatModal';


export default function ChatSidebar({ conversations, refreshConversations }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-64 h-full bg-gray-100 dark:bg-gray-900 border-r dark:border-gray-700 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h3>
          <button
            onClick={() => setModalOpen(true)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No conversations yet.</p>
          ) : (
            conversations.map((chat) => (
              <NavLink
                key={chat.id}
                to={`/chat/${chat.id}`}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded text-sm truncate ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`
                }
              >
                {chat.name || `Conversation ${chat.id}`}
              </NavLink>
            ))
          )}
        </div>
      </div>

      <NewChatModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={refreshConversations}
      />
    </>
  );
}
