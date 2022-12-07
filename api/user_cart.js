const express = require('express');
const router = express.Router();
const {
  createUser,
  checkIfUserExists,
  loginUser,
  updateUserById,
  getUserById,
  deleteUserById,
  addItemToUserCart,
  getUserCartByUserId,
  getUserCartDetailsByUserId,
  getProductDetailsById,
  deleteUserCartByUserId,
  deleteUserCartByProductId,
  deleteProductFromCart,
  updateProductQuantityInCart,
  updateUserCart,
} = require('../db/tables');
const { requireUser, requireAdmin } = require('./utils');

//GET api/users/cart
router.get('/:userId', requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userCart = await getUserCartDetailsByUserId(userId);

    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

// POST api/users/cart Adds product to users cart
router.post('/', requireUser, async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  try {
    const result = await addItemToUserCart({ userId, productId, quantity });
    if (result) {
      res.send(result);
    } else {
      res.status(400).send({
        name: 'Insufficient Product Inventory',
        message: 'Unable to add product to cart',
        error: 'InsufficientProduct',
      });
    }
  } catch (error) {
    next(error);
  }
});

// PATCH to update product quantity in users cart
router.patch('/', requireUser, async (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  console.log('req.body is: ', req.body)
  try {
    const result = await updateUserCart({ userId, productId, quantity });
    console.log('backend result: ', result)
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE to delete product in users cart
router.delete('/', requireUser, async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const result = await deleteUserCartByProductId({ userId, productId });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE to delete usersCart - For a user clearing their cart
router.delete('/clear', requireUser, async (req, res, next) => {
  try {
    const result = await deleteUserCartByUserId(req.body.userId);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;