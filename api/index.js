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

router.use('*', (req, res, next) => {
    res.status(404).send({
        name: 'Page Not Found',
        message: 'Something Went Wrong',
        Error: 'PageNotFoundError'
    })
})
module.exports = router;
