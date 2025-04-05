import api from './axios';

export async function getConversations() {
    const res = await api.get('/api/chat/conversations/');
    return res.data;
}

export async function searchUsers(query) {
    const res = await api.get(`/api/users/search/?q=${query}`);
    return res.data;
}

export async function createConversation(data) {
    const res = await api.post('/api/chat/conversations/', data);
    return res.data;
}
