import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVenueById } from '../api/venues';
import styled from 'styled-components';
import RatingBox from '../components/ui/RatingBox';

const Amenities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  @media (min-width: 1024px) {
  }
`;

const Gallery = styled.div`
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  margin: 0;
`;

const Location = styled.p`
  opacity: 0.7;
`;

const Description = styled.p`
  line-height: 1.6;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1.5rem;
`;

const OwnerText = styled.div`
  fontsize: 0.9rem;
`;

function BookingCard() {
  return (
    <BookingBox>
      <button>Book now</button>
    </BookingBox>
  );
}

export default function VenueDetailPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVenue() {
      try {
        const data = await getVenueById(id);
        setVenue(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!venue) return <p>Venue not found</p>;

  return (
    <Wrapper>
      <Gallery>
        <MainImage src={venue.media?.[0]?.url} alt={venue.name} />
      </Gallery>

      <Grid>
        <MainContent>
          <div>
            <Title>{venue.name}</Title>
            <Location>
              {venue.location?.city}, {venue.location?.country}
            </Location>
          </div>
          <OwnerText>{venue.owner?.name}</OwnerText>
          <RatingBox rating={venue.rating} />
          <Amenities>
            {venue.meta?.wifi && <span>WiFi</span>}
            {venue.meta?.parking && <span>Parking</span>}
            {venue.meta?.breakfast && <span>Breakfast</span>}
            {venue.meta?.pets && <span>Pets allowed</span>}
          </Amenities>
          <Description>{venue.description}</Description>
        </MainContent>

        <Sidebar>
          <BookingCard />
        </Sidebar>
      </Grid>
    </Wrapper>
  );
}
