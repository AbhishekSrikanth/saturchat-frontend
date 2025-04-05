import api from './axios';

export async function getConversations() {
  const res = await api.get('/api/chat/conversations/');
  return res.data;
}
