import { useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">Something went wrong</h1>
        <p className="text-gray-600 mb-2">You are being logged out for your safety.</p>
        <p className="text-gray-500 text-sm">Redirecting to login page...</p>
      </div>
    </div>
  );
}
