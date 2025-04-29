import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Avatar from './Avatar';

export default function ReceivedBubble({ text, time, user }) {
  const username = user?.username || 'Unknown';
  return (
    <div className="flex flex-col items-start self-start">
      <div className="flex items-center mb-2">
        <Avatar size='w-4 h-4' user={user} />
        <span className="text-xs text-black ml-1">{username}</span>
      </div>

      <div className="gradient-border inline-block">
        <div className="bubble-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      </div>

      <span className="text-[10px] text-gray-500 mt-1">{time}</span>
    </div>
  );
}
