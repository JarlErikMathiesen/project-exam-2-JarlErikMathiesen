import { useState } from 'react';
import styled from 'styled-components';
import { registerUser } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';

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

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: form.name,
      email: form.email,
      password: form.password,
      venueManager: form.venueManager,
    };

    try {
      const data = await registerUser(body);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      <Card>
        <Title>Register</Title>

        <Form>
          <FormField label="Name">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Password">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </FormField>

          <CheckboxRow>
            <Checkbox
              type="checkbox"
              name="venueManager"
              id="venueManager"
              checked={form.venueManager}
              onChange={handleChange}
            />
            <CheckboxLabel htmlFor="venueManager">
              Register as manager
            </CheckboxLabel>
          </CheckboxRow>

          <Button onClick={handleSubmit}>Register</Button>
        </Form>
      </Card>
    </Page>
  );
}
