import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getVenues } from '../api/venues';
import VenueCard from '../components/venue/VenueCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { MapPin, Calendar, PersonStanding } from 'lucide-react';

const SearchSection = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
`;

const SearchCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

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
    <>
      <SearchSection>
        <SearchCard>
          <Input icon={<MapPin size={16} />} placeholder="Place" />
          <Input icon={<Calendar size={16} />} placeholder="Time" />
          <Input icon={<PersonStanding size={16} />} placeholder="People" />
          <Button>Search</Button>
        </SearchCard>
      </SearchSection>
      <VenueList>
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </VenueList>
    </>
  );
}
