import { apiFetch } from './client';

export const getVenues = async () => {
  const data = await apiFetch('/venues');
  return data.data;
};

export const getVenueById = async (id) => {
  const data = await apiFetch(`/venues/${id}`);
  return data.data;
};

export const createVenue = async (venueData) => {
  const data = await apiFetch('/venues', {
    method: 'POST',
    body: JSON.stringify(venueData),
  });

  return data.data;
};

export const updateVenue = async (id, venueData) => {
  const data = await apiFetch(`/venues/${id}`, {
    method: 'PUT',
    body: JSON.stringify(venueData),
  });

  return data.data;
};

export const deleteVenue = async (id) => {
  await apiFetch(`/venues/${id}`, {
    method: 'DELETE',
  });
};
