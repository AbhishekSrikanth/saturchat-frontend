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

      if (onCreated) onCreated();
      onClose();
      navigate(`/chat/${conversation.id}`);
    } catch (err) {
      console.error('Failed to create chat:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
          Start New Chat
        </h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Add participant</label>
          <input
            type="text"
            placeholder="Search users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          {results.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border rounded mt-1 max-h-40 overflow-y-auto">
              {results.map((user) => (
                <div
                  key={user.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleAdd(user)}
                >
                  {user.username}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {selected.map((user) => (
            <span
              key={user.id}
              className="bg-blue-600 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1"
            >
              {user.username}
              <button onClick={() => handleRemove(user.id)} className="text-white font-bold">×</button>
            </span>
          ))}
        </div>

        {selected.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Group name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter a group name"
              className="w-full px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded bg-gray-400 text-white">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={selected.length === 0 || (selected.length > 1 && !groupName)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
