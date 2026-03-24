import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVenueById } from '../api/venues';
import styled from 'styled-components';

export default function VenueBookings() {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const data = await getVenueById(id);
        setVenue(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenue();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <BookingsList>
      <h1>{venue.name} bookings</h1>
      {venue.media?.[0]?.url && (
        <VenueImage src={venue.media[0].url} style={{}} />
      )}

      {venue.bookings?.length > 0 ? (
        venue.bookings.map((booking) => (
          <BookingCard key={booking.id}>
            <h3>{booking.customer?.name || 'Guest'}</h3>

            <DateRow>
              <span>
                From {new Date(booking.dateFrom).toLocaleDateString()}
              </span>
              <span>To {new Date(booking.dateTo).toLocaleDateString()}</span>
            </DateRow>

            <p>{booking.guests} guests</p>
          </BookingCard>
        ))
      ) : (
        <p>No bookings yet.</p>
      )}
    </BookingsList>
  );
}

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 1rem;
  width: 100%;
`;

const BookingCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 1rem;
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  max-width: 300px;
`;

const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const VenueImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  max-width: 700px;
`;
