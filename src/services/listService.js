import { API_BASE_URL, handleResponse } from "./api";

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
});

const normalizeList = (item) => {
    if (!item) return item;
    return { ...item, name: item.name || item.title };
};

const normalizeLists = (data) => {
    if (Array.isArray(data)) return data.map(normalizeList);
    return normalizeList(data);
};

export const listService = {
    getAll: async (workspaceId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/lists`, {
            method: 'GET',
            headers: authHeaders()
        });
        return normalizeLists(await handleResponse(response));
    },

    getById: async (workspaceId, listId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/lists/${listId}`, {
            method: 'GET',
            headers: authHeaders()
        });
        return normalizeList(await handleResponse(response));
    },

    create: async (workspaceId, list) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/lists`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ title: list.name, description: list.description || "" })
        });
        return normalizeList(await handleResponse(response));
    },

    update: async (workspaceId, listId, list) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/lists/${listId}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({ title: list.name, description: list.description || "" })
        });
        return normalizeList(await handleResponse(response));
    },

    deactivate: async (workspaceId, listId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/lists/${listId}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        return await handleResponse(response);
    }
};
