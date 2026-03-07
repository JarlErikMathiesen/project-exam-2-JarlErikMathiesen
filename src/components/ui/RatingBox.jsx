import styled from 'styled-components';

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const StyledRatingBox = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  padding: 4px;

  color: ${({ theme }) => theme.colors.white};
`;

export default function RatingBox({ rating }) {
  return (
    <RatingWrapper>
      rating
      <StyledRatingBox>
        {rating === 0 || !rating ? '—' : rating}
      </StyledRatingBox>
    </RatingWrapper>
  );
}
