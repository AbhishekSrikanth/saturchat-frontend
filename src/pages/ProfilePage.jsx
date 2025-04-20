// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import api from '../services/axios';
import ProfileInfoCard from '../components/ProfileInfoCard';
import ApiKeysCard from '../components/ApiKeysCard';

export default function ProfilePage() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    openai_api_key: '',
    anthropic_api_key: '',
    gemini_api_key: '',
    avatar: null,
    avatarFile: null,
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [touchedKeys, setTouchedKeys] = useState({});


  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/api/users/me/');
        setForm({
          ...res.data,
          avatar: res.data.avatar || null,
          avatarFile: null,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setForm({ ...form, [name]: value });
  
    // Mark the key as touched if it's one of the API keys
    if (['openai_api_key', 'anthropic_api_key', 'gemini_api_key'].includes(name)) {
      setTouchedKeys((prev) => ({ ...prev, [name]: true }));
    }
  
    setSaved(false);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Include all fields
    for (const key of ['first_name', 'last_name', 'bio']) {
      data.append(key, form[key] || '');
    }

    // Only include keys that were touched
    for (const key of ['openai_api_key', 'anthropic_api_key', 'gemini_api_key']) {
      if (touchedKeys[key]) {
        data.append(key, form[key] || '');
      }
    }

    if (form.avatarFile) {
      data.append('avatar', form.avatarFile);
    } else if (form.avatar === null) {
      data.append('avatar', ''); // clear avatar
    }

    try {
      const res = await api.patch('/api/users/me/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setForm({
        ...res.data,
        avatarFile: null,
      });

      setSaved(true);
      login({ ...res.data, pk: res.data.pk ?? res.data.id }, JSON.parse(localStorage.getItem('tokens')));
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex justify-center gap-6 p-6 max-h-full overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="flex gap-6 w-full max-w-6xl"
        encType="multipart/form-data"
      >
        {/* Left: Avatar + Basic Info */}
        <ProfileInfoCard
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />

        {/* Right: API Keys */}
        <ApiKeysCard
          form={form}
          handleChange={handleChange}
        />

        {/* Save Button */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
          >
            Save Changes
          </button>
          {saved && (
            <p className="text-green-600 text-sm text-center mt-2">Changes saved successfully.</p>
          )}
        </div>
      </form>
    </div>
  );
}
