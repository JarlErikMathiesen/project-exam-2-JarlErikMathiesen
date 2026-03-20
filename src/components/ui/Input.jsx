import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  color: #aaa;
  pointer-events: none;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '34px' : '14px')};
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

export default function Input({ icon, ...props }) {
  return (
    <Wrapper>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <StyledInput $hasIcon={!!icon} {...props} />
    </Wrapper>
  );
}
