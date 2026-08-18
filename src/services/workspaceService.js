import { API_BASE_URL, handleResponse } from "./api";

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
});

export const workspaceService = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/workspaces`, {
            method: 'GET',
            headers: authHeaders()
        });
        return await handleResponse(response);
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${id}`, {
            method: 'GET',
            headers: authHeaders()
        });
        return await handleResponse(response);
    },

    create: async (workspace) => {
        const response = await fetch(`${API_BASE_URL}/workspaces`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({
                name: workspace.name,
                description: workspace.description,
            })
        });
        return await handleResponse(response);
    },

    update: async (id, workspace) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({
                name: workspace.name,
                description: workspace.description
            })
        });
        return await handleResponse(response);
    },

    deactivate: async (id) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${id}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        return await handleResponse(response);
    }
};
