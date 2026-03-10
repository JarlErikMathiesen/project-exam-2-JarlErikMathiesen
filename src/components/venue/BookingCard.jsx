import styled from 'styled-components';
import { useAuth } from '../../features/auth/useAuth';
import { useState } from 'react';
import { createBooking } from '../../api/bookings';
import BookingCalendar from './BookingCalendar';
import Input from '../ui/Input';
import Button from '../ui/Button';

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export default function BookingCard({ venue, bookings }) {
  const { isLoggedIn } = useAuth();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [guests, setGuests] = useState(1);

  const disabledRanges = [
    { before: new Date() },
    ...bookings.map((booking) => ({
      from: new Date(booking.dateFrom),
      to: new Date(booking.dateTo),
    })),
  ];

  console.log(disabledRanges);

  function isDateRangeBooked(startDate, endDate) {
    return disabledRanges.some((booking) => {
      return startDate < booking.to && endDate > booking.from;
    });
  }

  function handleGuestChange(e) {
    const value = Number(e.target.value);

    const clamped = Math.min(Math.max(value, 1), venue.maxGuests);

    setGuests(clamped);
  }
  async function handleBooking() {
    if (!dateFrom || !dateTo) {
      alert('Please select dates');
      return;
    }
    if (guests > venue.maxGuests) {
      alert(`Maximum ${venue.maxGuests} guests allowed`);
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
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
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
        <label>
          Guests (max {venue.maxGuests})
          <Input
            type="number"
            min={1}
            max={venue.maxGuests}
            value={guests}
            onChange={handleGuestChange}
          />
        </label>

        <Button onClick={handleBooking}>Book</Button>
        <BookingCalendar
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          disabledRanges={disabledRanges}
        />
      </BookingBox>
    </>
  );
}
