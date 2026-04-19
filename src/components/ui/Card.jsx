import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  text-decoration: none;
  color: inherit;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

export default Card;
