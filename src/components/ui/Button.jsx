import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
