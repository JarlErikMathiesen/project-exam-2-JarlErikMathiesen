import styled from 'styled-components';

export default function FormField({ label, children }) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  margin-bottom: 4px;
`;
