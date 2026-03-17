import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getVenues } from '../api/venues';
import VenueCard from '../components/venue/VenueCard';

const VenueList = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function HomePage() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVenues() {
      try {
        const data = await getVenues();
        setVenues(data);
        data.forEach((venue) => {
          if (venue.media.length > 1) {
            console.log(`(${venue.name})${venue.media.length}`);
          }
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    }

    loadVenues();
  }, []);

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <VenueList>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </VenueList>
  );
}
