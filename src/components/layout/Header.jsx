import styled from 'styled-components';

const HeaderBar = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 1.5rem;
`;

export default function Header() {
  return <HeaderBar>HOLIDAZE</HeaderBar>;
}
