import { API_BASE_URL, handleResponse } from "./api";

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
});

export const taskService = {
    getAll: async (workspaceId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/tasks`, {
            method: 'GET',
            headers: authHeaders()
        });
        return await handleResponse(response);
    },

    getById: async (workspaceId, taskId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/tasks/${taskId}`, {
            method: 'GET',
            headers: authHeaders()
        });
        return await handleResponse(response);
    },

    create: async (workspaceId, task) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/lists/${task.id_list}/tasks`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({
                title: task.title,
                description: task.description || ""
            })
        });
        return await handleResponse(response);
    },

    update: async (workspaceId, taskId, task) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/tasks/${taskId}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                id_list: task.id_list
            })
        });
        return await handleResponse(response);
    },

    deactivate: async (workspaceId, taskId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        return await handleResponse(response);
    },

    move: async (workspaceId, taskId, targetListId) => {
        const response = await fetch(`${API_BASE_URL}/workspaces/${workspaceId}/tasks/${taskId}/move?new_list_id=${encodeURIComponent(targetListId)}`, {
            method: 'PUT',
            headers: authHeaders()
        });
        return await handleResponse(response);
    }
};
