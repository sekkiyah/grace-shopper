const express = require('express');
const router = express.Router();

const productsRouter = require('./products');
router.use('/products', productsRouter);

const usersRouter = require('./users');
router.use('/users', usersRouter);

const categoriesRouter = require('./categories');
router.use('/categories', categoriesRouter);

const orderHistoryRouter = require('./order_history');
router.use('/order_history', orderHistoryRouter);

const promoCodesRouter = require('./promo_codes');
router.use('/promo_codes', promoCodesRouter);

module.exports = router;
