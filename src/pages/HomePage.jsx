import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getVenues } from '../api/venues';
import VenueCard from '../components/venue/VenueCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { MapPin, Calendar, PersonStanding } from 'lucide-react';
import { isDateRangeBooked } from '../utils/date';
import FormField from '../components/ui/FormField';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const VenueList = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function HomePage() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState({
    location: '',
    dateFrom: '',
    dateTo: '',
    guests: '',
  });

  useEffect(() => {
    async function loadVenues() {
      try {
        const data = await getVenues();
        setVenues(data);
        setFilteredVenues(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load venues');
      } finally {
        setLoading(false);
      }
    }

    loadVenues();
  }, []);

  function handleSearch() {
    let results = [...venues];
    console.log('Search input:', searchInput);

    if (searchInput.location) {
      const query = searchInput.location.toLowerCase();

      results = results.filter((venue) =>
        `${venue.location?.city || ''} ${venue.location?.country || ''}`
          .toLowerCase()
          .includes(query),
      );
    }

    if (searchInput.guests) {
      results = results.filter(
        (venue) => venue.maxGuests >= Number(searchInput.guests),
      );
    }

    if (searchInput.dateFrom && searchInput.dateTo) {
      const start = new Date(searchInput.dateFrom);

      const end = new Date(searchInput.dateTo);
      end.setDate(end.getDate());

      if (end <= start) {
        alert('Check-out must be after check-in');
        return;
      }

      results = results.filter((venue) => {
        if (!venue.bookings || venue.bookings.length === 0) return true;

        return !isDateRangeBooked(start, end, venue.bookings);
      });
    }

    setFilteredVenues(results);
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SearchSection>
        <SearchCard>
          <FormField label="Location">
            <Input
              icon={<MapPin size={16} />}
              placeholder="Place"
              value={searchInput.location}
              onChange={(e) =>
                setSearchInput({ ...searchInput, location: e.target.value })
              }
            />
          </FormField>

          <FormField label="Check-in">
            <Input
              icon={<Calendar size={16} />}
              type="date"
              value={searchInput.dateFrom}
              onChange={(e) =>
                setSearchInput({ ...searchInput, dateFrom: e.target.value })
              }
            />
          </FormField>

          <FormField label="Check-out">
            <Input
              icon={<Calendar size={16} />}
              type="date"
              value={searchInput.dateTo}
              onChange={(e) =>
                setSearchInput({ ...searchInput, dateTo: e.target.value })
              }
            />
          </FormField>

          <FormField label="Guests">
            <Input
              icon={<PersonStanding size={16} />}
              type="number"
              placeholder="Guests"
              value={searchInput.guests}
              onChange={(e) =>
                setSearchInput({ ...searchInput, guests: e.target.value })
              }
            />
          </FormField>

          <ButtonWrapper>
            <Button onClick={handleSearch}>Search</Button>
          </ButtonWrapper>
        </SearchCard>
      </SearchSection>
      <VenueList>
        {filteredVenues.length === 0 ? (
          <div>No venues found.</div>
        ) : (
          filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        )}
      </VenueList>
    </>
  );
}
