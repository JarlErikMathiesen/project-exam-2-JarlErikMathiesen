import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVenueById } from '../api/venues';
import styled from 'styled-components';
import RatingBox from '../components/ui/RatingBox';
import BookingCard from '../components/venue/BookingCard';
import { amenities } from '../utils/amenities';
import VenueGallery from '../components/venue/VenueGallery';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Amenities = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const AmenityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.2rem;
  opacity: 0.75;
  text-transform: capitalize;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Sidebar = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  width: 100%;
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

export default function VenueDetailPage() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVenue() {
      try {
        const data = await getVenueById(id);
        setVenue(data);
        setBookings(data.bookings);
        data.bookings.forEach((booking) => {
          console.log(booking.dateFrom, booking.dateTo);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!venue) return <p>Venue not found</p>;

  const { name, media, location, price, owner, meta, rating, description } =
    venue;

  return (
    <Wrapper>
      <VenueGallery media={media} name={name} />

      <Grid>
        <MainContent>
          <div>
            <TitleWrapper>
              <Title>{name}</Title>
              <RatingBox rating={rating} />
            </TitleWrapper>

            <Location>
              {location?.city}, {location?.country}
            </Location>
          </div>
          <PriceOwnerWrapper>
            <PriceRow>
              <PriceLabel>Per night</PriceLabel>
              <Price>{price}£</Price>
            </PriceRow>
            <OwnerWrapper>
              <OwnerImage src={owner?.avatar.url} />
              <OwnerText>{owner?.name}</OwnerText>
            </OwnerWrapper>
          </PriceOwnerWrapper>

          <Amenities>
            {amenities.map(
              ({ key, trueLabel, falseLabel, TrueIcon, FalseIcon }) => {
                const available = meta?.[key];
                const Icon = available ? TrueIcon : FalseIcon;
                const label = available ? trueLabel : falseLabel;
                return (
                  <AmenityItem
                    key={key}
                    style={{ opacity: available ? 0.9 : 0.35 }}
                  >
                    <Icon size={16} />
                    {label}
                  </AmenityItem>
                );
              },
            )}
          </Amenities>
          <Description>{description}</Description>
        </MainContent>

        <Sidebar>
          <BookingCard
            venue={venue}
            bookings={bookings}
            setBookings={setBookings}
          />
        </Sidebar>
      </Grid>
    </Wrapper>
  );
}
