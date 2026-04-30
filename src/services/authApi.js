const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getStoredToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const parseErrorMessage = (payload, fallback) => {
  if (payload && typeof payload.msg === 'string') return payload.msg;
  if (payload && typeof payload.error === 'string') return payload.error;
  return fallback;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(parseErrorMessage(payload, 'Une erreur est survenue'));
  }

  return payload;
};

export const loginUser = async (credentials) => {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
};

export const registerUser = async (data) => {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const getCurrentUser = async (token) => {
  return request('/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const requestPasswordReset = async (email) => {
  return request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
};

export const resetPassword = async (token, password) => {
  return request(`/auth/reset-password/${token}`, {
    method: 'POST',
    body: JSON.stringify({ password })
  });
};
