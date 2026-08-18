const API_BASE_URL = 'https://api-trello-v7re.onrender.com';

const normalizeId = (item) => {
  if (item && item._id && !item.id) {
    return { ...item, id: item._id };
  }
  return item;
};

const normalizeResponse = (data) => {
  if (Array.isArray(data)) {
    return data.map(normalizeId);
  }
  return normalizeId(data);
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.message || errorData.detail;
    switch (response.status) {
      case 400:
        throw new Error(
          errorMsg || 'Este email ya está registrado. Intenta con otro email.'
        );
      case 401:
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');

        if (typeof window !== 'undefined') {
          window.location.href = '/#/login';
        }

        throw new Error(
          'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
        );
      case 403:
        throw new Error('No tienes permisos para realizar esta acción.');
      case 404:
        throw new Error('El recurso solicitado no fue encontrado.');
      case 409:
        throw new Error('El usuario ya existe en el sistema.');
      case 500:
        throw new Error(
          'Error interno del servidor. Intenta nuevamente más tarde.'
        );
      default:
        throw new Error(
          errorMsg || `Error ${response.status}: ${response.statusText}`
        );
    }
  }
  const data = await response.json();
  if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
    if (!data.success) {
      throw new Error(data.message || 'Error en la solicitud');
    }
    return normalizeResponse(data.data);
  }
  return normalizeResponse(data);
};

export { API_BASE_URL, handleResponse };
