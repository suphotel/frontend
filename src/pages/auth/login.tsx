import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {LoginData} from "../../types";

export default function Login() {
  const navigate = useNavigate();
  const {login, error, user} = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate]);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleLogin = (values: LoginData) => {
    login(values);
  }

  return (
    <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}} size={420}>
      <Title
        align="center"
        sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> size="sm" onClick={(event) => navigate('/auth/register')}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values: LoginData) => handleLogin(values))}>
          {error && (
            <Alert mb={25} color="red">
              Email or password is incorrect
            </Alert>
          )}

          <TextInput label="Email" placeholder="you@suphotel.com" type='email'
                     required {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="123456 is a great password :p" required
                         mt="md" {...form.getInputProps('password')} />
          <Button type='submit' fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}