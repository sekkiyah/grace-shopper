import { React, useState } from 'react';
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
  Products,
  Checkout
} from './pages';
import {
  Navbar
} from './components';
import {
  getProducts
} from './api'

const App = () => {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem('token');
    setToken('');
    setUser('');
  }

  async function fetchProducts() {
    const results = await getProducts()
    setProducts(results);
  }

  return (
    <>
      <Navbar
        logout={logout}
        token={token} />
      <Routes>
        <Route
          path='/'
          element={<Home />} />
        <Route
          path='/login'
          element={<Login
            token={token} />} />
        <Route
          path='/register'
          element={<Register
            token={token} />} />
        <Route
          path='/profile'
          element={<Profile />} />
        <Route
          path='/products'
          element={<Products
            products={products} />} />
        <Route
          path='/products/new-product'
          element={<NewProduct
            token={token}
            fetchProducts={fetchProducts}
            navigate={navigate} />} />
        <Route
          path='/products/edit-product/:productId'
          element={<EditProduct
            token={token}
            products={products}
            navigate={navigate} />} />
        <Route
          path='/cart'
          element={<UserCart />} />
        <Route
          path='/checkout'
          element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
