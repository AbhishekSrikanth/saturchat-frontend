import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { useAuth } from '../context/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { access, refresh, user } = await loginUser({ username, password });
      login(user, { access, refresh });
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="text-4xl my-10 font-black text-center text-black">SaturChat</h1>
        <h2 className="text-xl my-6 font-bold text-center text-black">Welcome Back!</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        />

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 rounded-full transition mt-4 cursor-pointer"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-700 mt-2">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="font-semibold text-black cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}
