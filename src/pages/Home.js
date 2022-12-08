import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  return (
    <Container className='d-flex flex-column align-items-center bg-body mt-3 mb-3 border rounded-3 shadow-lg p-3 mb-5 rounded'>
      <br></br>
      <h1 className='text-danger'>Welcome to Occult Outlet!</h1>
      <br></br>
      <Image className="rounded-true mt-1 mb-3 border border-dark border-2" roundedCircle='true' style={{width: '25rem', height: '28rem'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rose_Cross_Lamen.svg/1280px-Rose_Cross_Lamen.svg.png'></Image>
      {user && user.id ? (
        <p className='text-danger'>Hello, {user.username}!</p>
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
