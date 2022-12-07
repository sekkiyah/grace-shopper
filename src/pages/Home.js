import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <br></br>
      <h1>Welcome to Occult Outlet!</h1>
      <br></br>
      <Link to={'/register'}>Register</Link> to create an account!
      Already have an account? <Link to={`/login`}>Login!</Link>
    </div>
  )
};

export default Home;
