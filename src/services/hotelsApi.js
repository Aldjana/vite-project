import { getStoredToken } from './authApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const parseErrorMessage = (payload, fallback) => {
  if (payload && typeof payload.msg === 'string') return payload.msg;
  if (payload && typeof payload.error === 'string') return payload.error;
  return fallback;
};

const authFetch = async (path, options = {}) => {
  const token = getStoredToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

export const fetchHotels = async () => {
  const data = await authFetch('/hotels', { method: 'GET' });
  if (!data || !Array.isArray(data.hotels)) {
    throw new Error('Réponse serveur invalide');
  }
  return data.hotels;
};

export const createHotelRequest = async (hotelPayload) => {
  return authFetch('/hotels', {
    method: 'POST',
    body: JSON.stringify(hotelPayload)
  });
};

export const updateHotelRequest = async (hotelId, hotelPayload) => {
  return authFetch(`/hotels/${hotelId}`, {
    method: 'PUT',
    body: JSON.stringify(hotelPayload)
  });
};

export const deleteHotelRequest = async (hotelId) => {
  return authFetch(`/hotels/${hotelId}`, {
    method: 'DELETE'
  });
};
