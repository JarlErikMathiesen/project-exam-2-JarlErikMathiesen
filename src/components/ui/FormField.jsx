import styled from 'styled-components';

export default function FormField({ label, id, children, error }) {
  return (
    <Wrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
}

const ErrorText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  margin-top: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: 4px;
`;
