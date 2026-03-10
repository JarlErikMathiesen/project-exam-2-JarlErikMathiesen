import styled from 'styled-components';
import { useAuth } from '../../features/auth/useAuth';
import { useState } from 'react';
import { createBooking } from '../../api/bookings';
import BookingCalendar from './BookingCalendar';

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

  const disabledRanges = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  console.log(disabledRanges);

  function isDateRangeBooked(startDate, endDate) {
    return bookedRanges.some((booking) => {
      return startDate < booking.end && endDate > booking.start;
    });
  }

  async function handleBooking() {
    if (!dateFrom || !dateTo) {
      alert('Please select dates');
      return;
    }

    const start = new Date(dateFrom);
    const end = new Date(dateTo);

    if (isDateRangeBooked(start, end)) {
      alert('These dates are already booked');
      return;
    }
    if (end <= start) {
      alert('Check-out must be after check-in');
      return;
    }

    const bookingData = {
      dateFrom,
      dateTo,
      guests: Number(guests),
      venueId: venue.id,
    };

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
    <>
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
      <BookingCalendar />
    </>
  );
}
