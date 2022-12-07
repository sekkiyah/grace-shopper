import { React} from "react";

const CheckoutTotal = (userCart) => {

    const prices = userCart.map(item => {
       const  {orderedAmount, price} = item
        return (orderedAmount * parseInt(price))
    });

    const cartTotal = prices.reduce((total, value) => {
        return total + value;
    })

    return cartTotal;
  };

export default CheckoutTotal;

