import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
  text-align: center;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 6px;
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

export default function Register() {
  return (
    <Page>
      <Card>
        <Title>Register</Title>

        <Form>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />

          <CheckboxRow>
            <Checkbox type="checkbox" name="venueManager" id="venueManager" />
            <CheckboxLabel>Register as manager</CheckboxLabel>
          </CheckboxRow>

          <SubmitButton>Register</SubmitButton>
        </Form>
      </Card>
    </Page>
  );
}
