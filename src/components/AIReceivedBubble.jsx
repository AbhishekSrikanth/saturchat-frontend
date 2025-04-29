import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ReceivedBubble({ text, time, username }) {
  return (
    <div className="flex flex-col items-start self-start">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-black">{username}</span>
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
