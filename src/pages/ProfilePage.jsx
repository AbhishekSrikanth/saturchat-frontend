import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import api from '../services/axios';

export default function ProfilePage() {
  const { login } = useAuth(); // login helps update localStorage
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    openai_api_key: '',
    anthropic_api_key: '',
  });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/api/users/me/');
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch('/api/users/me/', form);
      setForm(res.data);
      setSaved(true);
      login({ ...res.data, pk: res.data.pk ?? res.data.id }, JSON.parse(localStorage.getItem('tokens'))); // refresh user in context
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 max-h-full overflow-auto bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileInput label="First Name" name="first_name" value={form.first_name} onChange={handleChange} />
          <ProfileInput label="Last Name" name="last_name" value={form.last_name} onChange={handleChange} />
          <ProfileInput label="Email" name="email" value={form.email} onChange={handleChange} />
          <ProfileInput label="Bio" name="bio" value={form.bio} onChange={handleChange} />
          <ProfileInput label="OpenAI API Key" name="openai_api_key" value={form.openai_api_key || ''} onChange={handleChange} />
          <ProfileInput label="Anthropic API Key" name="anthropic_api_key" value={form.anthropic_api_key || ''} onChange={handleChange} />

          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Save Changes
          </button>
          {saved && <p className="text-green-600 text-sm mt-2">Changes saved successfully.</p>}
        </form>
    </div>
  );
}

function ProfileInput({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value || ''}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded bg-gray-100"
        type="text"
      />
    </div>
  );
}
