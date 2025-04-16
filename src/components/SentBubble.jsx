import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SentBubble({ text, time }) {
  return (
    <div className="flex flex-col items-end self-end">

      <div className="bg-black text-white px-4 py-2 rounded-2xl shadow-lg">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>

      <span className="text-[10px] text-gray-500 mt-1">{time}</span>
    </div>
  );
}
