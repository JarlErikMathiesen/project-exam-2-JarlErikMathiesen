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

export default function BookingCard() {
  const { isLoggedIn } = useAuth();

  function BookVenue() {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [guests, setGuests] = useState(1);

    function handleTestBooking() {
      console.log(dateFrom);
      console.log(dateTo);
      console.log(guests);
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
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <button onClick={handleTestBooking}>Test booking</button>
      </div>
    );
  }

  return (
    <BookingBox>
      {isLoggedIn ? <BookVenue /> : <div>log in to book</div>}
    </BookingBox>
  );
}
