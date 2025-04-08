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
      <div className="fixed top-0 left-0 right-0 z-10">
        <TopBar />
      </div>

      <div className="flex flex-1 pt-[56px] h-full overflow-hidden">
        <ChatSidebar
          conversations={conversations}
          refreshConversations={refreshConversations}
        />
        <div className="flex-1 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
