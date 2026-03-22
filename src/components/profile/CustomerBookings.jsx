import styled from 'styled-components';

export default function CustomerBookings({ bookings }) {
  if (!bookings) return null;

  return (
    <>
      <BookingsTitle>My bookings</BookingsTitle>

      <BookingList>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking.id}>
              {booking.venue.media?.[0]?.url && (
                <BookingImage
                  src={booking.venue.media[0].url}
                  alt={booking.venue.media[0].alt || booking.venue.name}
                />
              )}
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
            </BookingCard>
          ))
        ) : (
          <p>No bookings yet.</p>
        )}
      </BookingList>
    </>
  );
}

const BookingsTitle = styled.h2`
  font-size: 1.6rem;
  margin-top: 1rem;
`;

const BookingList = styled.div`
  justify-content: center;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const BookingCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
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
  gap: 2px;
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
