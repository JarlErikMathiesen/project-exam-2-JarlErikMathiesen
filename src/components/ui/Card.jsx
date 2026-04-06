import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  text-decoration: none;
  color: inherit;
`;

export default Card;
