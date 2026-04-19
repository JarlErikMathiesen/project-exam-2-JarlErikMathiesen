import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { useToast } from '../features/ui/ToastContext';
import MainHeading from '../components/ui/MainHeading';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });
      console.log(data);

      login(data.accessToken, data.name);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      showToast('Invalid email or password', 'error');
    }
  };

  return (
    <Page>
      <Card>
        <MainHeading>Login</MainHeading>

        <Form onSubmit={handleSubmit}>
          <FormField label="Email" id="email">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField label="Password" id="password">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <Button type="submit">Log in</Button>

          <RegisterText>
            Not registered?{' '}
            <RegisterLink to="/register">Create account</RegisterLink>
          </RegisterText>
        </Form>
      </Card>
    </Page>
  );
}

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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RegisterText = styled.p`
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin: 4px 0 0;
`;

const RegisterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  font-weight: 500;
`;
