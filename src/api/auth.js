import { apiFetch } from './client';

export async function loginUser(credentials) {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  return data.data;
}

export async function registerUser(body) {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return data.data;
}
