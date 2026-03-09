import styled from 'styled-components';
import { useAuth } from '../../features/auth/useAuth';

const BookingBox = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export default function BookingCard() {
  const { isLoggedIn } = useAuth();
  return (
    <BookingBox>
      {isLoggedIn ? <button>Book now</button> : <div>log in to book</div>}
    </BookingBox>
  );
}
