import { React, useState, useEffect } from 'react';
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
  Admin
} from './pages';
import { Navbar } from './components';
import {getUserInfo} from './api'

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getUser = async() => {
    const storedToken = window.localStorage.getItem('token')

    if (storedToken) {
      setToken(storedToken);
      const thisUser = await getUserInfo(storedToken)
      if (thisUser) {
        setUser(thisUser);
        console.log('this user is: ', thisUser)
      }
        
    } else {
        console.log('error setting user');
    }
}

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser({});
  }

   useEffect ( () => {
     getUser();
     console.log('user is: ', user)
 }, [token]) 

  return (
    <>
      <Navbar logout={logout} token={token} />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setToken={setToken} navigate={navigate}/>} />
        <Route path='/register' element={<Register setToken={setToken} navigate={navigate} />} />
        <Route path='/profile' element={<Profile user={user}/>} />
        <Route path='/products/:productId' element={<ProductDetails token={token} user={user}/>} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/new-product' element={<NewProduct token={token} navigate={navigate} />} />
        <Route path='/products/edit-product/:productId' element={<EditProduct token={token} navigate={navigate} />} />
        <Route path='/cart' element={<UserCart token={token} user={user} setUser={setUser}/>} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/admin' element={<Admin />} />

      </Routes>
    </>
  );
};

export default App;
