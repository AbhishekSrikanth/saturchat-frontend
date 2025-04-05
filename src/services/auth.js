import api from './axios';

export async function loginUser({ username, password }) {
  const res = await api.post('/api/auth/login/', { username, password });
  return res.data;
}

export async function registerUser({ username, password }) {
  const res = await api.post('/api/auth/register/', { username, password });
  return res.data;
}
