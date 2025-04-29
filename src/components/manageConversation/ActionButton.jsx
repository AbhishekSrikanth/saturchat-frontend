export default function ActionButton({ onClick, children }) {
    return (
      <button
        onClick={onClick}
        className="w-full border-2 border-red text-red-700 font-medium py-2 rounded-full hover:bg-red-600 hover:text-white transition cursor-pointer"
      >
        {children}
      </button>
    );
  }
  