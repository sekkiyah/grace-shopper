import React, {useState} from 'react';
import {addOrCreateUsersOrderHistory, deleteProductFromCart, updateProductQuantityInCart} from '../api'
import {increaseQuantity, decreaseQuantity} from '../components'

const UserCart = ({token, user}) => {
  const [usersCart, setUsersCart] = useState([]);

  setUsersCart(user.userCart)

  

      if (usersCart.length) {

      return (
          <div>
              <h2>Shopping Cart</h2>
               <div> 
              {usersCart.map(item => {
                  const {id, productId, quantity, name, description, price, thumbnailImage} = item
                  console.log('item is: ', item)
                     return ( 
                     <div key={id}>
                          <h4>{name}</h4>
                          <p>{description}</p>
                          <p>{price}</p>
                          <span>
                            <button onClick={(event) => {event.preventDefault(); decreaseQuantity(token, user, productId)}
                                  }>-</button>
                            <p>{quantity}</p>
                            <button onClick={(event) => {event.preventDefault(); decreaseQuantity(token, user, productId)}
                            }>+</button>
                          </span>
                          <img src={thumbnailImage} alt= "thumbnail image" />
                          <button onClick={(event) => {event.preventDefault(); deleteProductFromCart(token, user.id, productId)}
                                  }>Remove Item </button>
                         
                      </div>
                  )})}
                </div>
                <button onClick={(event) => {event.preventDefault(); addOrCreateUsersOrderHistory(token, user.id)}
                                  }>Checkout</button> {/* Add navigate to payment info page*/}
          </div>
      )
  } else {
      return (<div>
                  <hr/>
              </div>
      )
  }
};

export default UserCart;