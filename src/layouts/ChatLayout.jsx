import { Outlet } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import TopBar from '../components/TopBar';

export default function ChatLayout() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <ChatSidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

