import styled from 'styled-components';

const PriceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  justify-content: space-between;
`;

const Total = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
`;

export default function BookingPrice({ dateFrom, dateTo, price }) {
  const nights =
    dateFrom && dateTo
      ? Math.ceil((dateTo - dateFrom) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = nights * price;

  if (nights <= 0) return null;

  return (
    <PriceWrapper>
      <Total>
        {nights} night{nights > 1 ? 's' : ''} at £{price}
      </Total>
      <Total>Total: £{totalPrice}</Total>
    </PriceWrapper>
  );
}
