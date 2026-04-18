import styled from 'styled-components';
import { registerUser } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import CheckboxField from '../components/ui/CheckboxField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Za-z0-9_]+$/, 'Only letters, numbers and underscore allowed'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[^\s@]+@stud\.noroff\.no$/, 'Must be a stud.noroff.no email'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),

  venueManager: yup.boolean(),
});

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

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page>
      <Card>
        <Title>Register</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Name" id="name" error={errors.name?.message}>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              {...register('name')}
            />
          </FormField>

          <FormField label="Email" id="email" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
          </FormField>

          <FormField
            label="Password"
            id="password"
            error={errors.password?.message}
          >
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </FormField>

          <CheckboxField
            label="Register as manager"
            {...register('venueManager')}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </Form>
      </Card>
    </Page>
  );
}
