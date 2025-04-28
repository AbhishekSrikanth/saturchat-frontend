import api from './axios';

export async function getConversations() {
    const res = await api.get('/chat/conversations/');
    return res.data;
}

export async function searchUsers(query) {
    const res = await api.get(`/users/search/?q=${query}`);
    return res.data;
}

export async function createConversation(data) {
    const res = await api.post('/chat/conversations/', data);
    return res.data;
}

export async function getMessages(conversationId) {
    const res = await api.get(`/chat/conversations/${conversationId}/messages/`);
    return res.data;
}

export async function updateConversation(conversationId, data) {
    const res = await api.patch(`/chat/conversations/${conversationId}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
}

export async function deleteConversation(conversationId) {
    const res = await api.delete(`/chat/conversations/${conversationId}/`);
    return res.data;
}

export async function addParticipant(conversationId, userId) {
    const res = await api.post(`/chat/conversations/${conversationId}/add_participant/`, {
        user_id: userId,
    });
    return res.data;
}

export async function removeParticipant(conversationId, userId) {
    const res = await api.post(`/chat/conversations/${conversationId}/remove_participant/`, {
        user_id: userId,
    });
    return res.data;
}

export async function leaveConversation(conversationId) {
    const res = await api.post(`/chat/conversations/${conversationId}/leave/`);
    return res.data;
}