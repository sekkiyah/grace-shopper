const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/tables/users');

router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      if (userId) {
        req.token = token;
        req.user = await getUserById(userId);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

router.use(async (req, res, next) => {
  console.log('=====REQ BODY LOGGING START=====');
  console.log(req.body);
  console.log('=====REQ BODY LOGGING END=====');
  next();
});


const productsRouter = require('./products');
router.use('/products', productsRouter);

const userCartRouter = require('./user_cart');
router.use('/users/cart', userCartRouter);

const usersRouter = require('./users');
router.use('/users', usersRouter);

const categoriesRouter = require('./categories');
router.use('/categories', categoriesRouter);

const orderHistoryRouter = require('./order_history');
router.use('/order_history', orderHistoryRouter);

const promoCodesRouter = require('./promo_codes');
router.use('/promo_codes', promoCodesRouter);

const productCategoriesRouter = require('./product_categories');
router.use('/product_categories', productCategoriesRouter);

router.get('/', async (req, res, next) => {
  res.send('Welcome to Occult Outlet API server\nView the repo here: https://github.com/sekkiyah/grace-shopper');
});

router.use('*', (req, res, next) => {
  res.status(404).send({
    name: 'Page Not Found',
    message: 'Something Went Wrong',
    Error: 'PageNotFoundError',
  });
});

router.use((err, req, res) => {
  res.send({
    message: err,
  });
});
module.exports = router;