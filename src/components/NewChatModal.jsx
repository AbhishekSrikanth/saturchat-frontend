import { useEffect, useState } from 'react';
import { createConversation, searchUsers } from '../services/chat';
import { useNavigate } from 'react-router-dom';


export default function NewChatModal({ isOpen, onClose, onCreated }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query.length >= 3) {
        searchUsers(query).then(setResults).catch(console.error);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [query]);

  const handleAdd = (user) => {
    if (!selected.some((u) => u.id === user.id)) {
      setSelected([...selected, user]);
    }
    setQuery('');
    setResults([]);
  };

  const handleRemove = (userId) => {
    setSelected(selected.filter((u) => u.id !== userId));
  };

  const handleCreate = async () => {
    const participantIds = selected.map((u) => u.id);
    const isGroup = participantIds.length > 1;
    try {
      const conversation = await createConversation({
        participants: participantIds,
        is_group: isGroup,
        name: isGroup ? groupName : undefined,
      });
      onCreated?.();
      onClose();
      navigate(`/chat/${conversation.id}`);
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-black">Start a New Chat</h2>

        <div>
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
          />
          {results.length > 0 && (
            <div className="bg-white border rounded-lg mt-2 max-h-48 overflow-y-auto shadow-sm">
              {results.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleAdd(user)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {selected.map((user) => (
            <span
              key={user.id}
              className="bg-black text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {user.username}
              <button
                onClick={() => handleRemove(user.id)}
                className="text-white font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {selected.length > 1 && (
          <input
            type="text"
            placeholder="Group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-300 text-black rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={selected.length === 0 || (selected.length > 1 && !groupName)}
            className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
