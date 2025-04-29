import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewChatModal from './NewChatModal';
import ConversationItem from './ConversationItem';
import { useAuth } from '../context/useAuth';

export default function ChatSidebar({ conversations, refreshConversations }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const filtered = conversations.filter((chat) => {
    if (chat.is_group) {
      return chat.name?.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      const other = chat.participants.find((p) => p.user.id !== user.id);
      return other?.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <div className="w-72 bg-white rounded-xl shadow-lg p-4 flex flex-col">
        {/* App Name */}
        <h1 className="text-2xl font-bold mb-4 text-black">SaturChat</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-gray-200 text-sm outline-none"
          />
        </div>

        {/* Conversations Header */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">Conversations</span>
          <button
            onClick={() => setModalOpen(true)}
            className="text-black text-2xl hover:text-gray-700 transition duration-200 cursor-pointer"
          >
            <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-400">No results found.</p>
          ) : (
            filtered.map((chat) => (
              <ConversationItem
                key={chat.id}
                conversation={chat}
                refreshConversations={refreshConversations}
              />
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
