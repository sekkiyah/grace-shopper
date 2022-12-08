import { React } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = ({ user, logout, token, navigate }) => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>
            <img style={{width: '30px', height: '30px', marginRight: '0.75rem'}}src='https://cdn-icons-png.flaticon.com/128/9091/9091354.png'>

            </img>
            Occult Outlet
            </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/products')}>Products</Nav.Link>
            {token && (
              <>
                <Nav.Link onClick={() => navigate('/profile')}>Profile</Nav.Link>
                <Nav.Link onClick={() => navigate(`/order-history/${user.id}`)}>Order History</Nav.Link>
              </>
            )}
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
            {
              user.isAdmin && <Nav.Link onClick={() => navigate('/admin')}>Admin</Nav.Link> 
            }

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
    </>
  );
};

export default NavBar;
