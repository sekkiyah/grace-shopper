import React, { useState } from 'react';
import { loginUser } from '../api';
import { Container, Button, Form, Card, FloatingLabel } from 'react-bootstrap';

const Login = ({ setToken, navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const results = await loginUser(username, password);

    if (results.token) {
      setToken(results.token);
      window.localStorage.setItem('token', results.token);
      navigate('/');
    } else {
      alert('Username or password incorrect, please try again.');
    }
  };

  return (
    <Container className='mt-5 d-flex justify-content-end'>
      <Card className='w-50 p-3'>
        <Card.Title className='text-center'>Login to view your account!</Card.Title>
        <Form
          onSubmit={event => {
            event.preventDefault();
            handleSubmit();
          }}>
          <Form.Group>
            <FloatingLabel label='Username'>
              <Form.Control type='text' placeholder='Username' required onChange={e => setUsername(e.target.value)} />
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel className='my-3' label='Password'>
            <Form.Control
              type='password'
              placeholder='Password'
              required
              onChange={e => setPassword(e.target.value)}></Form.Control>
          </FloatingLabel>
          <Button className='bg-danger bg-opacity-75 border border-dark text-dark fw-bold' type='submit'>
            Login
          </Button>
          <Button
            className='bg-success bg-opacity-50 border border-dark text-dark fw-bold mx-3'
            onClick={() => navigate('/register')}>
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
