import { apiFetch } from './client';

export function getProfile(name) {
  return apiFetch(`/holidaze/profiles/${name}?_bookings=true&_venues=true`);
}
