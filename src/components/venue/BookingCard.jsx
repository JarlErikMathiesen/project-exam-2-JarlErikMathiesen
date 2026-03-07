import styled from 'styled-components';

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export default function BookingCard() {
  return (
    <BookingBox>
      <button>Book now</button>
    </BookingBox>
  );
}
