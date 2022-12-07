import { React, useState } from 'react';
import { Container, NavDropdown, NavbarBrand, Nav, Navbar } from 'react-bootstrap';
import { AdminProducts, AdminUsers, AdminCategories, AdminOrderHistory, AdminPromoCodes } from '../components';

const Admin = ({ token }) => {
  const [targetComponent, setTargetComponent] = useState('Products');

  const handleSelectComponent = (eventKey, event) => {
    event.preventDefault();
    setTargetComponent(eventKey);
  };

  return (
    <Container className='d-flex flex-column align-items-center mt-3'>
      <Navbar
        expand='lg'
        className='border border-dark rounded-pill mb-4 ms-5 me-5 w-50 bg-opacity-50 shadow p-3 mb-5 bg-danger rounded'>
        <Container className='justify-content-center border border-dark rounded-pill p-2 mx-auto bg-danger bg-opacity-75'>
          <NavbarBrand className='fs-3 fw-bold text-decoration-underline'>Admin</NavbarBrand>
          <Nav className='text-light'>
            <NavDropdown
              value={targetComponent}
              onSelect={handleSelectComponent}
              title={<span className='fs-5 text-light'>{targetComponent}</span>}
              className='fs-5 fw-bold'
              id='basic-nav-dropdown'>
              <NavDropdown.Item eventKey='Products'>Products</NavDropdown.Item>
              <NavDropdown.Item eventKey='Users'>Users</NavDropdown.Item>
              <NavDropdown.Item eventKey='Categories'>Categories</NavDropdown.Item>
              <NavDropdown.Item eventKey='PromoCodes'>Promo-Codes</NavDropdown.Item>
              <NavDropdown.Item eventKey='OrderHistory'>Order-History</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      {targetComponent === 'Products' && <AdminProducts token={token} />}
      {targetComponent === 'Users' && <AdminUsers token={token} />}
      {targetComponent === 'Categories' && <AdminCategories token={token} />}
      {targetComponent === 'PromoCodes' && <AdminPromoCodes token={token} />}
      {targetComponent === 'OrderHistory' && <AdminOrderHistory token={token} />}
    </Container>
  );
};

export default Admin;
