import React, {useState, useEffect} from 'react';
import {deleteProductFromCart, updateProductQuantityInCart} from '../api'
import { Link, Navigate } from 'react-router-dom';
import { Card, Button, Navbar, NavDropdown, NavbarBrand, Nav, Toast} from 'react-bootstrap';
  

const UserCartItem = ({item, user, token, setUserCart, getUserCart, itemRemoved, setItemRemoved, userCart, cartEmpty, setCartEmpty}) => {
  const [itemView, setItemView] = useState({})
  const [toastMessage, setToastMessage] = useState('');
  const [toggleShowToast, setToggleShowToast] = useState(false);
  

  const {id, orderedAmount, name, description, price, thumbnailImage} = itemView
  
  const [newQuantity, setNewQuantity] = useState(orderedAmount)

  useEffect(() => {
    setItemView(item)
  }, [item])


  useEffect(() => {
    itemViewHelper()

  }, [])

async function itemViewHelper () {
  const cart = await getUserCart(token, user.id)
  cart.map(item => {
    if (item.id === id) {
      setItemView(item)
    }
  })
}

  async function handleSelectQuantity(eventKey, event) {
        event.preventDefault();
        handleUpdateQuantity(parseInt(eventKey));
    };

  function handleToggleToast(){
      setToggleShowToast(false);
  };

  async function updateQuantityCartHelper () {
    const cart = await getUserCart(token, user.id);
    cart.map(item => {
      if (item.id === id) {
      setItemView(item)
      }
    })
    setUserCart(cart)
  }

  async function removeItemCartHelper () {
    const cart = await getUserCart(token, user.id);
    if (cart) {
  setUserCart(cart)
  } else {
      setUserCart([])
      setCartEmpty(true)
  }
  }

  async function handleRemoveItem () {
    setToggleShowToast(true)
    setItemRemoved(true)
    setToastMessage('Product Removed From Cart')
    await deleteProductFromCart(token, {userId: user.id, productId: id});
    removeItemCartHelper();
  };

  async function handleUpdateQuantity (num) {
    setNewQuantity(num)
    await updateProductQuantityInCart(token, {userId: user.id, productId: id, quantity: num});
    setToggleShowToast(true)
    setToastMessage('Product Quantity Updated')
    updateQuantityCartHelper();
  };



       return ( 
       <Card style={{ width: '20rem' }} className='mx-5 mb-4 d-flex flex-column align-items-center border border-danger shadow p-3 mb-5 bg-body rounded' key={id}>
           <Card.Body className='d-flex flex-column mt-auto align-items-center'> 
            <Card.Img style={{width: '11rem', height: '12rem'}} className='img-thumbnail' variant='top' src={thumbnailImage}></Card.Img>
            <Card.Title className='fs-5'>{name}</Card.Title>
            <Card.Text style={{maxWidth: '250px', fontSize: '15px'}}className='d-inline-block text-truncate'>{description}</Card.Text>
            <Card.Text>${price}</Card.Text>
            <div className="d-flex justify-content-center p-2">
            <NavDropdown value={newQuantity} onSelect={handleSelectQuantity} title={<span className='fs-5'>Quantity: {orderedAmount}</span>} className='fs-5 fw-bold' id='basic-nav-dropdown'>
                <NavDropdown.Item eventKey='current'>New Quantity</NavDropdown.Item>
                <NavDropdown.Divider></NavDropdown.Divider>
                <NavDropdown.Item eventKey='1'>1</NavDropdown.Item>
                <NavDropdown.Item eventKey='2'>2</NavDropdown.Item>
                <NavDropdown.Item eventKey='3'>3</NavDropdown.Item>
                <NavDropdown.Item eventKey='4'>4</NavDropdown.Item>
                <NavDropdown.Item eventKey='5'>5</NavDropdown.Item>
                <NavDropdown.Item eventKey='6'>6</NavDropdown.Item>
                <NavDropdown.Item eventKey='7'>7</NavDropdown.Item>
                <NavDropdown.Item eventKey='8'>8</NavDropdown.Item>
                <NavDropdown.Item eventKey='9'>9</NavDropdown.Item>
                <NavDropdown.Item eventKey='10'>10</NavDropdown.Item>
            </NavDropdown>
               {
                    toastMessage.length ? 
                    <Toast show={toggleShowToast} onClose={handleToggleToast}className="toast position-absolute top-40 end-60">
                        <Toast.Header>
                            <strong className="me-auto fs-5 text-dark">Cart</strong>
                        </Toast.Header>
                        <Toast.Body className="text-center fs-6">{toastMessage}</Toast.Body>
                    </Toast> : <></>
                }
            </div>
            <div className="d-flex justify-content-center p-2">
              <Button className='bg-danger border border-dark bg-opacity-75 text-dark fw-bold' onClick={async (event) => { handleRemoveItem()}
                    }>Remove Item </Button>
            </div>
            <Link className="d-flex justify-content-center p-2 text-decoration-none" to={`/products/${id}`}>
                <Button className='bg-danger border border-dark bg-opacity-75 text-dark fw-bold'>View Product Details</Button>
             </Link>
          </Card.Body>
           
        </Card>
    ); 
}

export default UserCartItem;
  




