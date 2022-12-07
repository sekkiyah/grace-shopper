import React, { useState } from 'react';
import { registerUser } from '../api';
import { Container, Button, Form, Card, FloatingLabel } from 'react-bootstrap';

const Register = ({ setToken, navigate }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const verifyPassword = () => {
    if (password === confirmPassword) {
      handleSubmit();
    } else {
      alert('Passwords do not match, please try again.');
    }
  };

  const handleSubmit = async () => {
    const results = await registerUser(username, password);
    if (results) {
      setToken(results.token);
      window.localStorage.setItem('token', results.token);
      navigate('/');
    } else {
      alert('That username is taken!');
    }
  };

  return (
    <Container className='mt-5'>
      <Card className='w-50 p-3'>
        <Card.Title className='text-center'>Register here to create an account!</Card.Title>
        <Form
          onSubmit={event => {
            event.preventDefault();
            verifyPassword();
          }}>
          <FloatingLabel label='Email'>
            <Form.Control
              type='text'
              placeholder='Enter email here...'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label='Username'>
            <Form.Control
              type='text'
              placeholder='Enter username here...'
              required
              className='my-3'
              value={username}
              onChange={e => setUsername(e.target.value)}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label='Password'>
            <Form.Control
              type='password'
              placeholder='Enter password here...'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label='Confirm Password'>
            <Form.Control
              type='password'
              placeholder='Confirm password here...'
              required
              className='my-3'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </FloatingLabel>
          <Button className='bg-danger bg-opacity-75 border border-dark text-dark fw-bold' type='submit'>
            Register
          </Button>
          <Button
            className='bg-secondary bg-opacity-75 border border-dark text-dark fw-bold mx-3'
            onClick={() => navigate('/login')}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
