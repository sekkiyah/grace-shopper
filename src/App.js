import { React, useState, useEffect } from 'react';
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
  OrderHistory
} from './pages';
import { Navbar } from './components';
import { getUserInfo } from './api';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [userCart, setUserCart] = useState([])
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate();

  const getUser = async () => {
    const storedToken = window.localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      const thisUser = await getUserInfo(storedToken);
      if (thisUser) {
        setUser(thisUser);
        setUserCart(thisUser.userCart)
        console.log('this user is: ', thisUser)
      }
    } else {
      console.log('error setting user');
    }
  };

const checkUser = async() => {
  const storedToken = window.localStorage.getItem('token')
  if (storedToken) {
  const checkedUser = await getUserInfo(storedToken)
  return checkedUser
  }
}


const getUserCart = async () => {
  const storedToken = window.localStorage.getItem('token')
  const thisUser = await getUserInfo(storedToken)
  return thisUser.userCart
}


  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }


 useEffect (() => {
  getUser();
 }, [token])
 

  return (
    <>
      <Navbar logout={logout} token={token} navigate={navigate} user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setToken={setToken} navigate={navigate} />} />
        <Route path='/register' element={<Register setToken={setToken} navigate={navigate} />} />
        <Route path='/profile' element={<Profile token={token} user={user}/>} />
        <Route path='/products/:productId' element={<ProductDetails token={token} user={user} setUserCart={setUserCart} userCart={userCart} getUserInfo={getUserInfo}/>} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/new-product' element={<NewProduct token={token} navigate={navigate} />} />
        <Route path='/cart' element={<UserCart token={token} user={user} getUserInfo={getUserInfo} setUserCart = {setUserCart} userCart={userCart}/>} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin' element={<Admin token={token}/>} />
        <Route path='/order-history/:userId' element={<OrderHistory />}></Route>

      </Routes>
    </>
  );
};

export default App;
