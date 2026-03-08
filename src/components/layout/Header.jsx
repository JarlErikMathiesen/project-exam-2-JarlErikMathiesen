import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accessToken'),
  );
  const navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <HeaderBar>
      <Logo to="/">HOLIDAZE</Logo>
      {isLoggedIn ? (
        <HeaderWrapper>
          <HeaderLink to="/profile">
            <User size={24} />
          </HeaderLink>
          <HeaderLink onClick={HandleLogout}>Logout</HeaderLink>
        </HeaderWrapper>
      ) : (
        <HeaderLink to="/login">Log in</HeaderLink>
      )}
    </HeaderBar>
  );
}
