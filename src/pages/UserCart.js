import React, {useState, useEffect} from 'react';
import {addOrCreateUsersOrderHistory} from '../api';
import {UserCartItem} from "../components";
import { Row, Container, Button } from 'react-bootstrap';


const UserCart = ({token, user, getUserInfo, setUserCart, userCart}) => {

      if (userCart) {

      return (
        <Container className='d-flex flex-column align-items-center'>
              <h2 className="text-center fs-1 fw-bold fst-italic p-3 mx-2">Shopping Cart</h2>
              <Container>
                 <Row className='row justify-content-center' md={4}>
                  {userCart.map((item, idx) => {
                    return <UserCartItem item={item} user={user} token={token} getUserInfo={getUserInfo} setUserCart={setUserCart}/>
                           })}
                 </Row>
                </Container>
                <div className="d-flex justify-content-center p-2">
            
                    <Button onClick={(event) => {event.preventDefault(); addOrCreateUsersOrderHistory(token, user.id)}
                                  }>Checkout</Button> {/* Add navigate to payment info page*/}
                </div>
          </Container>
      )
  } else if (!userCart){

      return (<div className="text-center">
                  <p>Cart is empty</p>
              </div>
      )
  }
};

export default UserCart;