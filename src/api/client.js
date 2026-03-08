const API_BASE = 'https://v2.api.noroff.dev';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': import.meta.env.VITE_API_KEY,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.errors?.[0]?.message || 'API request failed');
  }

  return response.json();
}
