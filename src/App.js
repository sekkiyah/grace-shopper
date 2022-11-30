import { React, useState } from 'react';
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import {
  Home,
  Register,
  Login,
  Profile,
  UserCart,
  EditProduct,
  NewProduct,
  ProductDetails,
  Products,
  Checkout,
} from './pages';
import { Navbar } from './components';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser('');
  }

  return (
    <>
      <Navbar logout={logout} token={token} />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login token={token} />} />
        <Route path='/register' element={<Register setToken={setToken} navigate={navigate} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/products/:productId' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/new-product' element={<NewProduct token={token} navigate={navigate} />} />
        <Route path='/products/edit-product/:productId' element={<EditProduct token={token} navigate={navigate} />} />
        <Route path='/cart' element={<UserCart token={token} user={user}/>} />
        <Route path='/checkout' element={<Checkout />} />

      </Routes>
    </>
  );
};

export default App;
