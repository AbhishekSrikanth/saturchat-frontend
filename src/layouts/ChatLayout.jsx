import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import ChatSidebar from '../components/ChatSidebar';
import { getConversations } from '../services/chat';

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
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <ChatSidebar
          conversations={conversations}
          refreshConversations={refreshConversations}
        />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
