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
    Error: 'PageNotFoundError',
  });
});

router.use((err, req, res) => {
  res.send({
    message: err,
  });
});
module.exports = router;
