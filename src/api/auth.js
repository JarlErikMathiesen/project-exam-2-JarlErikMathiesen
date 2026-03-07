import { apiFetch } from './client';

export async function loginUser(credentials) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return data.data;
}
