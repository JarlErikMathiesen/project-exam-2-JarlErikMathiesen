const API_BASE = 'https://v2.api.noroff.dev/holidaze';

export async function apiFetch(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.errors?.[0]?.message || 'API request failed');
  }

  return response.json();
}
