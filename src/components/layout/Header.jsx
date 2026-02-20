import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const HeaderBar = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: inherit;
`;

const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 500;

  &:hover {
    opacity: 0.85;
  }
`;

export default function Header() {
  const isLoggedIn = localStorage.getItem('accessToken');

  return (
    <HeaderBar>
      <Logo to="/">HOLIDAZE</Logo>
      {isLoggedIn ? (
        <HeaderLink to="/profile">
          <User size={24} />
        </HeaderLink>
      ) : (
        <HeaderLink to="/login">Log in</HeaderLink>
      )}
    </HeaderBar>
  );
}
