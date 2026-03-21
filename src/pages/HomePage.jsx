import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getVenues } from '../api/venues';
import VenueCard from '../components/venue/VenueCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { MapPin, Calendar, PersonStanding } from 'lucide-react';
import { isDateRangeBooked } from '../utils/date';
import BookingCalendar from '../components/venue/BookingCalendar';

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

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  margin-bottom: 2px;
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

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SearchSection>
        <SearchCard>
          <Field>
            <Label>Location</Label>
            <Input
              icon={<MapPin size={16} />}
              placeholder="Place"
              value={searchInput.location}
              onChange={(e) =>
                setSearchInput({ ...searchInput, location: e.target.value })
              }
            />
          </Field>

          <Field>
            <Label>Check-in</Label>
            <Input
              icon={<Calendar size={16} />}
              type="date"
              value={searchInput.dateFrom}
              onChange={(e) =>
                setSearchInput({ ...searchInput, dateFrom: e.target.value })
              }
            />
          </Field>

          <Field>
            <Label>Check-out</Label>
            <Input
              icon={<Calendar size={16} />}
              type="date"
              value={searchInput.dateTo}
              onChange={(e) =>
                setSearchInput({ ...searchInput, dateTo: e.target.value })
              }
            />
          </Field>

          <Field>
            <Label>Guests</Label>
            <Input
              icon={<PersonStanding size={16} />}
              type="number"
              placeholder="Guests"
              value={searchInput.guests}
              onChange={(e) =>
                setSearchInput({ ...searchInput, guests: e.target.value })
              }
            />
          </Field>

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
