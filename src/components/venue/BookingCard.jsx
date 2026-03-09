import styled from 'styled-components';
import { useAuth } from '../../features/auth/useAuth';
import { useState } from 'react';
import { createBooking } from '../../api/bookings';

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export default function BookingCard({ venue }) {
  const { isLoggedIn } = useAuth();

  function BookVenue() {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [guests, setGuests] = useState(1);

    async function handleBooking() {
      const bookingData = {
        dateFrom,
        dateTo,
        guests: Number(guests),
        venueId: venue.id,
      };

      if (!dateFrom || !dateTo) {
        alert('Please select dates');
        return;
      }
      try {
        const booking = await createBooking(bookingData);
        console.log('Booking created:', booking);
      } catch (error) {
        console.error('Booking failed:', error);
      }
    }
    return (
      <div>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />

        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />

        <input
          type="number"
          max={venue.maxGuests}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <button onClick={handleBooking}>Test booking</button>
      </div>
    );
  }

  return (
    <BookingBox>
      {isLoggedIn ? <BookVenue /> : <div>log in to book</div>}
    </BookingBox>
  );
}
