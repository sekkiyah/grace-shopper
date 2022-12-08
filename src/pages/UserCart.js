import React, {useState, useEffect} from 'react';
import {UserCartItem} from "../components";
import { Row, Container, Button } from 'react-bootstrap';


const UserCart = ({token, user, getUserCart, navigate}) => {
    const [userCart, setUserCart] = useState([]);
    const [itemRemoved, setItemRemoved] = useState(false)
    const [cartEmpty, setCartEmpty] = useState(false)

    async function checkoutCartHandler() {
        const userId = user.id
        const cart = await getUserCart(token, userId);
        if (cart) {
            navigate('/checkout')
        }

    }

    async function getCartHelperFunction () {
        const userId = user.id
        const cart = await getUserCart(token, userId);

        if (cart) {
            setUserCart(cart)
        } else {
            setUserCart([])         
        }
        }

    useEffect(() => {
        getCartHelperFunction();
        
    }
    , [cartEmpty])

    useEffect(() => {
        if (itemRemoved) {
            getCartHelperFunction();
            setItemRemoved(false);
           
        }
    }, [itemRemoved])
    

      if (userCart && userCart.length) {

      return (
        <Container className='d-flex flex-column align-items-center'>
              <h2 className="text-center fs-1 fw-bold fst-italic p-3 mx-2">Shopping Cart</h2>
              <Container>
                 <Row className='row justify-content-center' md={4}>
                  {
                   userCart.map((item, idx) => {
                    return <UserCartItem item={item} user={user} token={token} getCartHelperFunction={getCartHelperFunction} getUserCart={getUserCart} setUserCart={setUserCart} userCart={userCart} setItemRemoved={setItemRemoved} itemRemoved={itemRemoved} cartEmpty={cartEmpty} setCartEmpty={setCartEmpty} key={idx}/>
                           }) 
                  }
                 </Row>
                </Container>
                <div className="d-flex justify-content-center p-2">
            
                    <Button onClick={(event) => {event.preventDefault(); checkoutCartHandler()}
                                  }>Checkout</Button>
                </div>
          </Container>
      )
  } else {

      return (<div className="text-center">
                  <p>Cart is empty</p>
              </div>
      )
  }

};

export default UserCart;