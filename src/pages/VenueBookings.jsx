import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVenueById } from '../api/venues';

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
    <div>
      <h1>{venue.name} bookings</h1>

      {venue.bookings?.length > 0 ? (
        venue.bookings.map((booking) => (
          <div key={booking.id}>
            <p>User: {booking.customer?.name}</p>
            <p>From: {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p>To: {new Date(booking.dateTo).toLocaleDateString()}</p>
            <p>Guests: {booking.guests}</p>
          </div>
        ))
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}
