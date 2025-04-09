export default function ReceivedBubble({ text, time }) {
    return (
      <div className="flex flex-col items-start max-w-xs md:max-w-sm self-start">
        <div className="bg-white text-black px-4 py-2 rounded-2xl shadow-lg">
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-[10px] text-gray-500 mt-1">{time}</span>
      </div>
    );
  }
  