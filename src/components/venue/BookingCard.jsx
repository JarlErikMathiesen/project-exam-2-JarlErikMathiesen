import styled from 'styled-components';
import { useAuth } from '../../features/auth/useAuth';
import { useState } from 'react';
import { createBooking } from '../../api/bookings';
import BookingCalendar from './BookingCalendar';
import Input from '../ui/Input';
import Button from '../ui/Button';
import BookingPrice from './BookingPrice';
import { getDisabledRanges, isDateRangeBooked } from '../../utils/date';

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 500px;
`;

const GuestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function BookingCard({ venue, bookings }) {
  const { isLoggedIn } = useAuth();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [guests, setGuests] = useState(1);

  const disabledRanges = getDisabledRanges(bookings);

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

    if (isDateRangeBooked(start, end, bookings)) {
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
    <BookingBox>
      <GuestWrapper>
        <label>Guests (max {venue.maxGuests})</label>

        <Input
          type="number"
          min={1}
          max={venue.maxGuests}
          value={guests}
          onChange={handleGuestChange}
        />
      </GuestWrapper>

      <BookingCalendar
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        disabledRanges={disabledRanges}
      />

      <BookingPrice dateFrom={dateFrom} dateTo={dateTo} price={venue.price} />

      <Button onClick={handleBooking}>Book</Button>
    </BookingBox>
  );
}
