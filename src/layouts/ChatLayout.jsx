import { Outlet } from 'react-router-dom';
import ChatSidebar from '../components/ChatSidebar';
import TopBar from '../components/TopBar';

export default function ChatLayout() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
