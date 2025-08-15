import { API_BASE_URL,handleResponse } from "./api";

export const workspaceService =  {
    getAll: async() => {
        try {
             const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/workspaces`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        });
            return await handleResponse(response)
        }catch(err){
            console.error("Error al obtener los workspace:",err);
            throw err;
        }
         
    },

    getById: async(id) =>{
         try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/workspaces/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        }catch(err){

        }
    },

    create: async(workspace) => {
        try {
              const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/workspaces`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: workspace.name,
                    description: workspace.description,
                })
            });
            return await handleResponse(response);
        }catch(err){
            console.error("Error al crear el workspace",err)
        }
    },

    update: async (id, workspace) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/workspaces/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: workspace.name,
                    description: workspace.description
                })
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al actualizar tipo de catálogo:', error);
            throw error;
        }
    },


    deactivate: async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/workspaces/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Error al desactivar el workspace:', error);
            throw error;
        }
    }

}