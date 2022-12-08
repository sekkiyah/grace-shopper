import React, {useState, useEffect, Component} from 'react';
import {addOrCreateUsersOrderHistory} from '../api';
import { Container, Button, Form, FloatingLabel, Col, Row} from 'react-bootstrap';



const Checkout = ({user, getUserCart, token, navigate}) => {
  const [userCart, setUserCart] = useState([])

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLineOne, setAddressLineOne] = useState('');
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')

  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('')

  async function userCartHelper(){
    const cartToCheckout = await getUserCart(token, user.id);
    console.log('cartToCheckout: ', cartToCheckout)
    setUserCart(cartToCheckout)

  } 

  useEffect(()=>{
    userCartHelper();
  }, [])

  async function submitCartHandler() {
    await addOrCreateUsersOrderHistory(token, user.id)
    navigate(`/order-history/${user.id}`)
  }



  return  <Container className='d-flex flex-column align-items-center mt-5'>
    <Form.Label className='text-center p-2 w-75 fs-2 fw-bold fst-italic'>Shipping and Payment</Form.Label>
         <Form onSubmit={event => {
        event.preventDefault();
        submitCartHandler();
      }}>
    <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridFirstName">
      <FloatingLabel label='First Name'>
        <Form.Control
          type='text'
          placeholder='Enter first name here'
          required
          value={firstName}
          onChange={e => setFirstName(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridLastName">
      <FloatingLabel label='Last Name'>
        <Form.Control
          type='text'
          placeholder='Enter last name here'
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridAddress1">
      <FloatingLabel label='Address Line One'>
        <Form.Control
          type='text'
          placeholder='Enter Street Name and Number'
          required
          className='my-3'
          value={addressLineOne}
          onChange={e => setAddressLineOne(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress2">
      <FloatingLabel label='Address Line Two'>
        <Form.Control
          type='text'
          placeholder='Enter Apt/Unit Number if Applicable'
          className='my-3'
          value={addressLineTwo}
          onChange={e => setAddressLineTwo(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Row className="d-flex flex-row align-items-center mb-3">
      <Form.Group as={Col} controlId="formGridCity">
      <FloatingLabel label='City'>
        <Form.Control
          type='text'
          placeholder='Enter City Here'
          required
          className='my-3'
          value={city}
          onChange={e => setCity(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
      <FloatingLabel label='State'>
        <Form.Control
          type='text'
          placeholder='Enter State Here'
          required
          value={state}
          onChange={e => setState(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridZip">
      <FloatingLabel label='ZipCode'>
        <Form.Control
          type='text'
          placeholder='Enter Zip Code Here'
          required
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      </Row>
  
    <Form.Group className="mb-3" controlId="formGridCreditCartNumber">
      <FloatingLabel label='Credit Card Number'>
        <Form.Control
          type='text'
          placeholder='Enter Credit Card Number Here'
          required
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridExpiration">
      <FloatingLabel label='Expiration'>
        <Form.Control
          type='text'
          placeholder='Enter Card Expiration Here'
          required
          className='my-3'
          value={expiration}
          onChange={e => setExpiration(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridCVV">
      <FloatingLabel label='CVV'>
        <Form.Control
          type='text'
          placeholder='Enter CVV Here'
          required
          className='my-3'
          value={cvv}
          onChange={e => setCvv(e.target.value)}></Form.Control>
      </FloatingLabel>
      </Form.Group>
      </Row>
      <div className="d-flex justify-content-center p-2">
      <Button className='bg-danger bg-opacity-75 border border-dark text-dark fw-bold' type='submit'>
        Submit Payment
      </Button>
      </div>
    </Form>
    </Container>




}




export default Checkout;