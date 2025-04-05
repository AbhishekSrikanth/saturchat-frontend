import api from './axios';

export async function loginUser({ username, password }) {
  const res = await api.post('/api/token/', { username, password });
  return res.data;
}

export async function registerUser({ username, password }) {
  const res = await api.post('/register/', { username, password });
  return res.data;
}
