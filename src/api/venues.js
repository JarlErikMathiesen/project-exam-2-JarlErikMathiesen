import { apiFetch } from './client';

export const getVenues = async () => {
  const data = await apiFetch('/holidaze/venues?_bookings=true&sortOrder=asc');
  return data.data;
};

export const getVenueById = async (id) => {
  const data = await apiFetch(
    `/holidaze/venues/${id}?_owner=true&_bookings=true`,
  );
  return data.data;
};

export const createVenue = async (venueData) => {
  const data = await apiFetch('/holidaze/venues', {
    method: 'POST',
    body: JSON.stringify(venueData),
  });

  return data.data;
};

export const updateVenue = async (id, venueData) => {
  const data = await apiFetch(`/holidaze/venues/${id}`, {
    method: 'PUT',
    body: JSON.stringify(venueData),
  });

  return data.data;
};

export const deleteVenue = async (id) => {
  await apiFetch(`/holidaze/venues/${id}`, {
    method: 'DELETE',
  });
};
