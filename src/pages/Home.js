import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <Container className='text-center'>
      <br></br>
      <h1>Welcome to Occult Outlet!</h1>
      <br></br>
      {user && user.id ? (
        <>Hello, {user.username}!</>
      ) : (
        <>
          <Link to={'/register'}>Register</Link> to create an account! Already have an account?{' '}
          <Link to={`/login`}>Login!</Link>
        </>
      )}
    </Container>
  );
};

export default Home;
