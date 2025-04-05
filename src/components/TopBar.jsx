import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">SaturChat</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {user?.username}
        </span>
        <button
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-white text-sm flex items-center justify-center"
        >
          {user?.username?.[0]?.toUpperCase() ?? 'U'}
        </button>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
