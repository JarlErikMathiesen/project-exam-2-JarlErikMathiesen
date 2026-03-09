import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  outline: none;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Input;
