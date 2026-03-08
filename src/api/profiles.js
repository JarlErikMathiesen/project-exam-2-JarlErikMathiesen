import { apiFetch } from './client';

export async function getProfiles() {
  const data = await apiFetch('/holidaze/profiles');

  return data;
}
