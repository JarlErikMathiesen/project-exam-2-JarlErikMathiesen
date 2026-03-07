import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVenueById } from '../api/venues';
import styled from 'styled-components';
import RatingBox from '../components/ui/RatingBox';
import {
  Fish,
  FishOff,
  Wifi,
  WifiOff,
  EggFried,
  EggOff,
  CircleParking,
  CircleParkingOff,
} from 'lucide-react';

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const Amenities = styled(BookingBox)`
  display: flex;
  gap: 1rem;
  width: fit-content;
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

const OwnerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OwnerText = styled.span`
  font-size: 1.2rem;
  font-weight: 300;
`;

const OwnerImage = styled.img`
  border-radius: 20px;
  height: 2rem;
  width: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceLabel = styled.span`
  font-size: 0.85rem;
`;

const Price = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const PriceOwnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
            <TitleWrapper>
              <Title>{venue.name}</Title>
              <RatingBox rating={venue.rating} />
            </TitleWrapper>

            <Location>
              {venue.location?.city}, {venue.location?.country}
            </Location>
          </div>
          <PriceOwnerWrapper>
            <PriceRow>
              <PriceLabel>Per night</PriceLabel>
              <Price>{venue.price}£</Price>
            </PriceRow>
            <OwnerWrapper>
              <OwnerImage src={venue.owner?.avatar.url} />
              <OwnerText>{venue.owner?.name}</OwnerText>
            </OwnerWrapper>
          </PriceOwnerWrapper>

          <Amenities>
            {venue.meta?.wifi ? <Wifi /> : <WifiOff />}
            {venue.meta?.parking ? <CircleParking /> : <CircleParkingOff />}
            {venue.meta?.breakfast ? <EggFried /> : <EggOff />}
            {venue.meta?.pets ? <Fish /> : <FishOff />}
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
