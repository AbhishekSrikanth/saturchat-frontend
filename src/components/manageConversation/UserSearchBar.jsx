import { useEffect, useState } from 'react';
import { searchUsers } from '../../services/chat';
import UserChip from '../UserChip';

export default function UserSearchBar({ onAdd, onSelect, selected, onRemoveSelected }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 3) {
        searchUsers(query).then(setResults).catch(console.error);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (user) => {
    onSelect(user);
    setQuery('');
    setResults([]);
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        />
        <button
          onClick={() => onAdd()} // external "Add" action handled by parent
          className="px-4 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50"
          disabled={selected.length === 0}
        >
          Add
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white border rounded-lg mt-2 max-h-48 overflow-y-auto shadow-sm">
          {results.map((u) => (
            <div key={u.id} onClick={() => handleSelect(u)} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              {u.username}
            </div>
          ))}
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((u) => (
            <UserChip key={u.id} user={u} onRemove={onRemoveSelected} isRemovable />
          ))}
        </div>
      )}
    </div>
  );
}
