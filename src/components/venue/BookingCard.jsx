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

export default function BookingCard({ venue, bookings }) {
  const { isLoggedIn } = useAuth();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);

  const bookedRanges = bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  function isDateBooked(date) {
    return bookedRanges.some(
      (booking) => date >= booking.start && date <= booking.end,
    );
  }
  console.log(isDateBooked(new Date('2028-12-02')));
  console.log(isDateBooked(new Date('2025-12-02')));

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

  if (!isLoggedIn) {
    return (
      <BookingBox>
        <div>Log in to book</div>
      </BookingBox>
    );
  }

  return (
    <BookingBox>
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
    </BookingBox>
  );
}
