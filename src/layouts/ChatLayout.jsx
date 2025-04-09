import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import { getConversations } from '../services/chat';
import ProfileMenu from '../components/ProfileMenu'; // you'll create this later

export default function ChatLayout() {
  const [conversations, setConversations] = useState([]);

  const refreshConversations = async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to refresh conversations:', err);
    }
  };

  useEffect(() => {
    refreshConversations();
  }, []);

  return (
    <div className="flex gap-6 min-h-screen w-full bg-[#d3d3d3] p-10 box-border">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        refreshConversations={refreshConversations}
      />

      {/* Chat Outlet */}
      <div className="flex-1 h-full flex flex-col">
        <Outlet />
      </div>

      {/* Profile button floating to the right */}
      <div className="w-10">
        <ProfileMenu />
      </div>
    </div>
  );
}
