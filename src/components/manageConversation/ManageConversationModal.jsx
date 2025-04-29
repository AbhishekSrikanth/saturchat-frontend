import { useState } from 'react';
import Avatar from '../Avatar';
import { useAuth } from '../../context/useAuth';
import {
  updateConversation,
  deleteConversation,
  addParticipant,
  removeParticipant,
  leaveConversation
} from '../../services/chat';

import AvatarEditor from './AvatarEditor';
import UserChip from '../UserChip';
import UserSearchBar from './UserSearchBar';
import SectionHeader from './SectionHeader';
import ActionButton from './ActionButton';

export default function ManageConversationModal({ isOpen, onClose, conversation, refreshConversations }) {
  const { user } = useAuth();
  const [name, setName] = useState(conversation.name || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(conversation.avatar || null);
  const [selected, setSelected] = useState([]);

  const isAdmin = conversation.participants.find(p => p.user.id === user.id && p.is_admin);
  const isGroup = conversation.is_group;
  const otherUser = !isGroup && conversation.participants.find(p => p.user.id !== user.id)?.user;

  const handleAddSelectedUser = (user) => {
    if (user && !selected.some((u) => u.id === user.id)) {
      setSelected([...selected, user]);
    }
  };

  const handleRemoveSelectedUser = (id) => {
    setSelected(selected.filter((u) => u.id !== id));
  };

  const handleRemoveParticipant = async (id) => {
    await removeParticipant(conversation.id, id);
    refreshConversations?.();
  };

  const handleAddParticipants = async () => {
    await Promise.all(selected.map(u => addParticipant(conversation.id, u.id)));
    setSelected([]);
    refreshConversations?.();
  };

  const handleUpdate = async () => {
    const form = new FormData();
    if (name.trim()) form.append('name', name.trim());
    if (avatarFile) form.append('avatar', avatarFile);
    if (!preview) form.append('avatar', '');
    await updateConversation(conversation.id, form);
    refreshConversations?.();
    onClose();
  };

  const handleDelete = async () => {
    await deleteConversation(conversation.id);
    refreshConversations?.();
    onClose();
  };

  const handleLeave = async () => {
    await leaveConversation(conversation.id);
    refreshConversations?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4 overflow-y-auto max-h-[90vh]">

        <h2 className="text-xl font-bold text-black">Manage Conversation</h2>

        {/* GROUP: ADMIN */}
        {isGroup && isAdmin && (
          <>
            <AvatarEditor preview={preview} setPreview={setPreview} setFile={setAvatarFile} />

            <SectionHeader>Group Name</SectionHeader>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
            />

            <hr className="border-gray-300" />

            <SectionHeader>Participants</SectionHeader>
            <div className="flex flex-wrap gap-2">
              {conversation.participants.map(p => (
                <UserChip key={p.user.id} user={p.user} onRemove={handleRemoveParticipant} isRemovable={!p.is_admin} />
              ))}
            </div>

            <hr className="border-gray-300" />

            <SectionHeader>Add Participants</SectionHeader>
            <UserSearchBar
              onSelect={handleAddSelectedUser}
              onAdd={handleAddParticipants}
              selected={selected}
              onRemoveSelected={handleRemoveSelectedUser}
            />

            <hr className="border-gray-300" />

            <div className="flex flex-col gap-4">
              <ActionButton onClick={handleDelete}>Delete Conversation</ActionButton>
              <div className="flex gap-2">
                <button onClick={onClose} className="w-full py-2 rounded-full border text-sm hover:bg-gray-100 cursor-pointer">Close</button>
                <button onClick={handleUpdate} className="w-full py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 cursor-pointer">Save</button>
              </div>
            </div>
          </>
        )}

        {/* GROUP: NON-ADMIN */}
        {isGroup && !isAdmin && (
          <>
            <div className="flex items-center gap-3">
              <Avatar user={{ username: conversation.name, avatar: conversation.avatar }} size="w-12 h-12" />
              <span className="text-lg font-semibold">{conversation.name}</span>
            </div>

            <SectionHeader>Participants</SectionHeader>
            <div className="flex flex-wrap gap-2">
              {conversation.participants.map(p => (
                <UserChip key={p.user.id} user={p.user} />
              ))}
            </div>

            <hr className="border-gray-300 mt-4" />
            <ActionButton onClick={handleLeave}>Leave Conversation</ActionButton>
            <button onClick={onClose} className="w-full py-2 rounded-full border text-sm hover:bg-gray-100 mt-2">Close</button>
          </>
        )}

        {/* DIRECT MESSAGE */}
        {!isGroup && otherUser && (
          <>
            <div className="flex items-center gap-3">
              <Avatar user={otherUser} size="w-12 h-12" />
              <span className="text-lg font-semibold">{otherUser.username}</span>
            </div>

            <hr className="border-gray-300 mt-4" />
            <ActionButton onClick={handleDelete}>Delete Conversation</ActionButton>
            <button onClick={onClose} className="w-full py-2 rounded-full border text-sm hover:bg-gray-100 mt-2">Close</button>
          </>
        )}
      </div>
    </div>
  );
}
