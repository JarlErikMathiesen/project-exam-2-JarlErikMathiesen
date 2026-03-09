import { apiFetch } from './client';

export const createBooking = async (bookingData) => {
  const data = await apiFetch('/holidaze/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });

  return data.data;
};
