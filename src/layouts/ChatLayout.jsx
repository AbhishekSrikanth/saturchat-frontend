import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import { getConversations } from '../services/chat';
import ProfileMenu from '../components/ProfileMenu';
import { useUserSocket } from '../hooks/useUserSocket';

export default function ChatLayout() {
  const [conversations, setConversations] = useState([]);

  const refreshConversations = useCallback(async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to refresh conversations:', err);
    }
  }, []);

  const handleConversationUpdated = useCallback(() => {
    refreshConversations();
  }, [refreshConversations]);

  useUserSocket(handleConversationUpdated);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  return (
    <div className="flex h-screen w-full bg-[#d3d3d3] p-10 gap-6 box-border overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        refreshConversations={refreshConversations}
      />

      {/* Main chat area (ChatPage) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Outlet />
      </div>

      {/* Profile */}
      <div className="w-10 shrink-0">
        <ProfileMenu />
      </div>
    </div>
  );
}
