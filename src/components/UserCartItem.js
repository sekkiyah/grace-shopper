import React, {useState, useEffect} from 'react';
import {deleteProductFromCart, updateProductQuantityInCart} from '../api'
import { Link } from 'react-router-dom';
import { Card, Button, Navbar, NavDropdown, NavbarBrand, Nav, Toast} from 'react-bootstrap';
  

const UserCartItem = ({item, user, token, getUserInfo, setUserCart}) => {
  const [newQuantity, setNewQuantity] = useState('')
  const [removedItemId, setRemovedItemId]= useState('')
  const [itemView, setItemView] = useState(item)
  const [toastMessage, setToastMessage] = useState('');
  const [toggleShowToast, setToggleShowToast] = useState(false);
  const {id, orderedAmount, name, description, price, thumbnailImage} = itemView


  async function handleSelectQuantity(eventKey, event) {
        event.preventDefault();
        setNewQuantity(parseInt(eventKey))
    }

  function handleToggleToast(){
      setToggleShowToast(false);
  }


  async function handleRemoveItem () {
    const response = await deleteProductFromCart(token, {userId: user.id, productId: id})
    setRemovedItemId('')
    if (response.ok) {
      const thisUser = await getUserInfo(token)
      setToastMessage('Product Removed From Cart')
      setUserCart(thisUser.userCart)
      if (thisUser.userCart) {
      thisUser.userCart.map(currentItem => {
        if (currentItem.id === id) {
          setItemView("")
        }
      })
    } 
     }
  }

  async function handleUpdateQuantity () {
   const response = await updateProductQuantityInCart(token, {userId: user.id, productId: id, quantity: newQuantity})
   setNewQuantity('') 
   if (response.ok) {
      const thisUser = await getUserInfo(token)
      setUserCart(thisUser.userCart)
      setToastMessage('Product Quantity Updated')
      thisUser.userCart.map(currentItem => {
        if (currentItem.id === id) {
          setItemView(currentItem)
        }
      })
    }
  }

  
  useEffect (() => {
    setToggleShowToast(true);
    if (newQuantity !== ''){
    handleUpdateQuantity();
    }
  }, [newQuantity])

  useEffect (() => {
    setToggleShowToast(true);
    if(removedItemId !== '') {
    handleRemoveItem();
    }
  }, [removedItemId])

 
 
       return ( 
       <Card style={{ width: '20rem' }} className='mx-5 mb-4 d-flex flex-column border border-danger shadow p-3 mb-5 bg-body rounded' key={id}>
           <Card.Img variant="top" src={thumbnailImage}></Card.Img>
           <Card.Body className='d-flex flex-column mt-auto'> 
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{price}</Card.Text>
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
            <Card.Img variant="top" src={thumbnailImage}></Card.Img>
            <div className="d-flex justify-content-center p-2">
              <Button className='bg-danger border border-dark bg-opacity-75 text-dark fw-bold' onClick={async (event) => {event.preventDefault(); setRemovedItemId(id); handleRemoveItem()}
                    }>Remove Item </Button>
            </div>
            <Link className="d-flex justify-content-center p-2 text-decoration-none" to={`/products/${id}`}>
                <Button className='bg-danger border border-dark bg-opacity-75 text-dark fw-bold'>View Product Details</Button>
             </Link>
          </Card.Body>
           
        </Card>
    ) 
}

export default UserCartItem;
  





