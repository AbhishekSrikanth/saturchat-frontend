import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { useAuth } from '../context/useAuth';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { access, refresh, user } = await registerUser({
        username,
        password1,
        password2,
      });

      login(user, { access, refresh });
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      if (data?.username) setError(`Username: ${data.username[0]}`);
      else if (data?.password1) setError(`Password: ${data.password1[0]}`);
      else if (data?.password2) setError(`Confirm Password: ${data.password2[0]}`);
      else setError('Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="text-4xl  my-6 font-black text-center text-black">SaturChat</h1>
        <h2 className="text-xl my-4 font-bold text-center text-black">Create an Account</h2>
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
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm outline-none"
        />

        <button
          type="submit"
          className="w-full mt-4 bg-black hover:bg-gray-800 text-white font-medium py-2 rounded-full transition cursor-pointer"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-700 mt-2">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="font-semibold text-black cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
