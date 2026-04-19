import styled from 'styled-components';
import Button from '../ui/Button';
import { deleteBooking } from '../../api/bookings';
import placeholderImg from '../../assets/holidaze_placeholder_image.jpg';
import Card from '../ui/Card';
import List from '../ui/ProfileList';

const handleDelete = async (id) => {
  try {
    await deleteBooking(id);

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export default function CustomerBookings({ bookings }) {
  if (!bookings) return null;

  return (
    <>
      <BookingsTitle>My bookings</BookingsTitle>

      <List>
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const src =
              booking.venue.media?.length > 0 &&
              booking.venue.media[0].url?.trim() !== ''
                ? booking.venue.media[0].url
                : placeholderImg;

            return (
              <Card key={booking.id}>
                <BookingImage
                  src={src}
                  alt={booking.venue.media?.[0]?.alt || booking.venue.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholderImg;
                  }}
                />
                <BookingInfo>
                  <VenueName>{booking.venue.name}</VenueName>
                  <DateRow>
                    <DateText>
                      From {new Date(booking.dateFrom).toLocaleDateString()}
                    </DateText>
                    <DateText>
                      To {new Date(booking.dateTo).toLocaleDateString()}
                    </DateText>
                  </DateRow>
                </BookingInfo>
                <ButtonWrapper>
                  <Button onClick={() => handleDelete(booking.id)}>
                    Delete Booking
                  </Button>
                </ButtonWrapper>
              </Card>
            );
          })
        ) : (
          <p>No bookings yet.</p>
        )}
      </List>
    </>
  );
}

const BookingsTitle = styled.h2`
  font-size: 1.6rem;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-self: center;
  padding: 15px;
`;

const BookingImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
`;

const VenueName = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateText = styled.span`
  font-size: 13px;
`;
