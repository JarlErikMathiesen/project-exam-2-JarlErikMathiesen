import { apiFetch } from './client';

export function getProfile(name) {
  return apiFetch(`/holidaze/profiles/${name}?_bookings=true&_venues=true`);
}

export const updateProfileAvatar = async (name, body) => {
  const data = await apiFetch(`/holidaze/profiles/${name}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  return data.data;
};
