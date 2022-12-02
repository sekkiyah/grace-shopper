import React from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = ({ logout, token, navigate }) => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Occult Outlet</Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/products')}>Products</Nav.Link>
            <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
            {token ? (
              <Nav.Link
                onClick={() => {
                  navigate('/');
                  logout();
                }}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Occult Outlet</a>
                </div>
                <ul class="nav navbar-nav">
                    <li class="active"><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    {
                        token ? (
                            <>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/" onClick={() => logout()}><button class="btn btn-danger navbar-btn">Logout</button></Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/register">New Account</Link></li>
                                <li><Link to="/login"><button class="btn btn-danger navbar-btn">Login</button></Link></li>
                            </>
                        )
                    }
                </ul>
                <form class="navbar-form navbar-left" action="/action_page.php">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search"/>
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                </form>
            </div>
        </nav> */}
    </>
  );
};

export default NavBar;
