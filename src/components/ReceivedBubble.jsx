import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Avatar from './Avatar';

export default function ReceivedBubble({ text, time, user }) {
  const username = user?.username || 'Unknown';
  return (
    <div className="flex flex-col items-start self-start">
      <div className="flex items-center mb-1">
        <Avatar size='w-4 h-4' user={user} />
        <span className="text-xs text-black ml-1">{username}</span>
      </div>

      <div className="bg-white text-black px-4 py-2 rounded-2xl shadow-lg max-w-full break-words whitespace-pre-wrap">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>

      <span className="text-[10px] text-gray-500 mt-1">{time}</span>
    </div>
  );
}
