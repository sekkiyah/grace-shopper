import React, {useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {CheckoutTotal, CheckPaymentStatus} from "../components";
import {checkoutCart} from '../api'

import './Checkout.css'
 
// This is your test publishable API key.
//const stripe = Stripe("pk_test_51MC6nqDzfuXFCCnfvK5TxhLoCDArEkEXjONZMiuy8uoZt8v6SuCviPO9g5eF56E1BHrgGQcJtYW5J7PVHNy5x30p00FMjBYOWF");


const Checkout = ({user, getUserCart, token, stripeKey}) => {
  const [userCart, setUserCart] = useState([])

  async function userCartHelper(){
    const cartToCheckout = await getUserCart(token, user.id);
    console.log('cartToCheckout: ', cartToCheckout)
    setUserCart(cartToCheckout)

  } 

  useEffect(()=>{
    userCartHelper();
  }, [])

  console.log('usercart in checkout is: ', userCart)

  //UI Helpers:

  function showMessage(messageText) {
    const messageContainer = document.querySelector("#payment-message");
  
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
  
    setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageText.textContent = "";
    }, 4000);
  }

  function setLoading(isLoading) {
    if (isLoading) {
      // Disable the button and show a spinner
      document.querySelector("#submit").disabled = true;
      document.querySelector("#spinner").classList.remove("hidden");
      document.querySelector("#button-text").classList.add("hidden");
    } else {
      document.querySelector("#submit").disabled = false;
      document.querySelector("#spinner").classList.add("hidden");
      document.querySelector("#button-text").classList.remove("hidden");
    }
  }
  //submit handler
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/api/?????",
      },
    });
  
    if (error.type === "card_error" || error.type === "validation_error") {
      showMessage(error.message);
    } else {
      showMessage("An unexpected error occurred.");
    }
  
    setLoading(false);
  }

  const total = CheckoutTotal(userCart)
  console.log ('checkout total is: ', total)

  async function checkoutHelperFunction(){
    await checkoutCart(total)
  }

  CheckPaymentStatus();

  return  <form className="payment-form">
            <div className="payment-element">
              //Stripe.js injects the Payment Element
            </div>
            <button className="submit" onClick={(event) => {event.preventDefault(); handleSubmit(event)}}>
              <div className="spinner hidden" id="spinner"></div>
              <span className="button-text">Pay now</span>
            </button>
            <div className="payment-message hidden"></div>
        </form>



}




export default Checkout;