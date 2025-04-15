export default function ReceivedBubble({ text, time, username }) {
  return (
    <div className="flex flex-col items-start self-start">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-black">{username}</span>
      </div>

      <div className="bg-white text-black px-4 py-2 rounded-2xl shadow-lg">
        <p className="text-sm">{text}</p>
      </div>

      <span className="text-[10px] text-gray-500 mt-1">{time}</span>
    </div>
  );
}
