import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './pages';

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </>
  );
};

export default App;
