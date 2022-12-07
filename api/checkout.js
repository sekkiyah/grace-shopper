const express = require('express');
const checkoutRouter = express.Router();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51MC6nqDzfuXFCCnfYumhDkYf4VQXcqNZnrEvpNKt3l9A2ZnaNanJCUOI4OFJ4Xkoro9ANafqSEWtpbvGe8rHGPQ800UdSe628d');


checkoutRouter.post("/", async (req, res, next) => {
    const { total } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });


module.exports = checkoutRouter