import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function ManagerVenues({ venues }) {
  const navigate = useNavigate();

  return (
    <>
      <h2>My venues</h2>

      <Button onClick={() => navigate('/profile/create-venue')}>
        + Create new venue
      </Button>

      {venues?.length > 0 ? (
        venues.map((venue) => (
          <div key={venue.id}>
            {venue.media?.[0]?.url && (
              <img
                src={venue.media[0].url}
                alt={venue.name}
                style={{ width: '200px', height: '120px', objectFit: 'cover' }}
              />
            )}

            <h3>{venue.name}</h3>
            <p>{venue.price}£ per night</p>

            <Button onClick={() => navigate(`/profile/venue/${venue.id}/edit`)}>
              Edit
            </Button>

            <Button
              onClick={() => navigate(`/profile/venue/${venue.id}/bookings`)}
            >
              View bookings
            </Button>
          </div>
        ))
      ) : (
        <p>No venues yet.</p>
      )}
    </>
  );
}
