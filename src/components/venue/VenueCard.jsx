import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import RatingBox from '../ui/RatingBox';
import placeholderImg from '../../assets/holidaze_placeholder_image.jpg';

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LeftContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.h2`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 300;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const Location = styled.p`
  font-size: 0.6rem;
  opacity: 0.8;
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SmallInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
`;

const Price = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
`;

const PriceText = styled.p`
  margin-bottom: 0;
  justify-self: end;
`;

const RightContent = styled.div`
  padding: 1rem;
  gap: 0.5rem;
  justify-content: space-between;
`;

export default function VenueCard({ venue }) {
  const imageUrl = venue.media?.[0]?.url;
  const validImageUrl =
    imageUrl && imageUrl.trim() !== '' ? imageUrl : placeholderImg;

  return (
    <Card to={`/venue/${venue.id}`}>
      <ImageWrapper>
        <Image
          src={validImageUrl}
          alt={venue.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = placeholderImg;
          }}
        />
      </ImageWrapper>
      <Content>
        <LeftContent>
          <InfoRow>
            <Name>{venue.name}</Name>
          </InfoRow>
          <Location>
            {venue.location?.city}, {venue.location?.country}
          </Location>

          <InfoRow>
            <SmallInfo>
              Max
              <Users size={16} />
              {venue.maxGuests}
            </SmallInfo>
          </InfoRow>
        </LeftContent>
        <RightContent>
          <RatingBox rating={venue.rating} />
          <div>
            <PriceText>per night</PriceText>
            <Price>{venue.price}£</Price>
          </div>
        </RightContent>
      </Content>
    </Card>
  );
}
