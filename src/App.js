import {React, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { 
  Home,
  Register,
  Login,
  Profile,
  UserCart,
  EditProduct, 
  NewProduct,
  ProductDetails,
  Checkout } from './pages';

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/cart' element={<UserCart />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
      </Routes>
    </>
  );
};

export default App;
