import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button, Alert,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import {RegisterData} from "../../types";
import useAuth from "../../hooks/useAuth";

const initialRegisterData: RegisterData = {
  email: '',
  pseudo: '',
  password: '',
  passwordConfirmation: '',
}

export default function Register() {
  const navigate = useNavigate();
  const {register, error, user} = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate]);

  const form = useForm<RegisterData>({
    initialValues: initialRegisterData,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      passwordConfirmation: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const handleRegister = (values: RegisterData) => {
    register(values);
  }

  return (
    <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}} size={420}>
      <Title
        align="center"
        sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
      >
        Create an account
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do you have already an account?{' '}
        <Anchor<'a'> size="sm" onClick={() => navigate('/auth/login')}>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {(error) && (
          <Alert mb={25} color="red">
            {error.response?.data.message}
          </Alert>
        )}

        <form onSubmit={form.onSubmit((values: RegisterData) => handleRegister(values))}>
          <TextInput label="Email" placeholder="you@suphotel.com" required {...form.getInputProps('email')} />
          <TextInput label="Pseudo" placeholder="you" required mt="md" {...form.getInputProps('pseudo')} />
          <PasswordInput label="Password" placeholder="Your password" required
                         mt="md" {...form.getInputProps('password')} />
          <PasswordInput label="Password confirmation" placeholder="Your password again" required
                         mt="md" {...form.getInputProps('passwordConfirmation')} />

          <Button type='submit' fullWidth mt="xl">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}