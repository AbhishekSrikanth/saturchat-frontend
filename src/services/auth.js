import api from './axios';

export async function loginUser({ username, password }) {
  const res = await api.post('/api/auth/login/', { username, password });
  return res.data;
}

export async function registerUser({ username, password1, password2 }) {
  const res = await api.post('/api/auth/register/', {
    username,
    password1,
    password2,
  });
  return res.data;
}

export async function getCurrentUser() {
  const res = await api.get('/api/auth/user/');
  return res.data;
}

