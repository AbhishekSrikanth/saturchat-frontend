import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="flex justify-end items-center px-4 py-2 border-b">
      <Link to="/profile">
        <button className="w-8 h-8 rounded-full bg-gray-300 hover:ring-2 ring-gray-500">
          {/* Placeholder avatar */}
        </button>
      </Link>
    </div>
  );
}
