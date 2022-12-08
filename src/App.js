import { React, useState, useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import {
  Home,
  Register,
  Login,
  Profile,
  UserCart,
  NewProduct,
  ProductDetails,
  Products,
  Checkout,
  Admin,
  OrderHistory,
} from './pages';
import { Navbar } from './components';
import { getUserInfo, getUserCart } from './api';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    const storedToken = window.localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      const thisUser = await getUserInfo(storedToken);
      if (thisUser) {
        setUser(thisUser);
      }
    }
  };

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <>
      <Navbar logout={logout} token={token} navigate={navigate} user={user} />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/login' element={<Login setToken={setToken} navigate={navigate} />} />
        <Route path='/register' element={<Register setToken={setToken} navigate={navigate} />} />
        <Route path='/profile' element={<Profile token={token} user={user} getUser={getUser} />} />
        <Route path='/products/:productId' element={<ProductDetails token={token} user={user} getUserCart={getUserCart}/>} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/new-product' element={<NewProduct token={token} navigate={navigate} />} />
        <Route path='/cart' element={<UserCart token={token} user={user} getUserCart={getUserCart} navigate={navigate}/>} />
        <Route path='/checkout' element={<Checkout user={user} getUserCart={getUserCart} token={token} navigate={navigate}/>} />
        <Route path='/admin' element={<Admin token={token}/>} />
        <Route path='/order-history/:userId' element={<OrderHistory token={token} user={user} />}></Route>

      </Routes>
    </>
  );
};

export default App;