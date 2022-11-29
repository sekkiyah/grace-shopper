const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  createUser,
  checkIfUserExists,
  loginUser,
  updateUserById,
  getUserById,
  deleteUserById,
  addItemToUserCart,
  getUserCartByUserId,
  deleteUserCartByUserId,
  deleteProductFromCart,
  updateProductQuantityInCart,

} = require('../db/tables');
const { requireUser, requireAdmin } = require('./utils');
const { UsernameTakenError, EmailTakenError } = require('./errors');

// const { deleteUser } = require('../src/api');

router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const checkUser = await checkIfUserExists(username, email);
    console.log(checkUser);
    if (checkUser && checkUser.username === username) {
      res.status(500).send({
        name: 'Username Taken',
        message: UsernameTakenError(username),
        error: 'UsernameTakenError',
      });
    } else if (checkUser && checkUser.email === email) {
      res.status(500).send({
        name: 'Email Taken',
        message: EmailTakenError(email),
        error: 'EmailTakenError',
      });
    } else {
      const user = await createUser({ email, username, password });
      const role = user.isAdmin ? 'admin' : 'user';
      const token = jwt.sign({ username, userId: user.id, role }, process.env.JWT_SECRET);
      res.send({ name: 'RegisterSuccess', message: 'Successfully registered', user, token });
    }
  } catch (error) {
    console.error('API register error');
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send({
        name: 'Incomplete Fields',
        message: 'Must supply both username and password',
        error: 'IncompleteFieldsError',
      });
    } else {
      const user = await loginUser({ username, password });
      if (!user) {
        res.status(404).send({
          name: 'Incorrect Login Info',
          message: 'Username or password is incorrect',
          error: 'IncorrectLoginInfoError',
        });
      } else {
        const role = user.isAdmin ? 'admin' : 'user';
        const token = jwt.sign({ username, userId: user.id, role }, process.env.JWT_SECRET);
        res.send({ message: 'Login successful', user, token });
      }
    }
  } catch (error) {
    console.error('API login error');
    next(error);
  }
});

router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

router.patch('/:userId', requireAdmin, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).send({
        name: 'No user found',
        message: 'No user with that id exists',
        error: 'UserDoesNotExistError',
      });
    } else {
      const updatedUser = {};
      for (key in req.body) {
        updatedUser[key] = req.body[key];
      }
      const result = await updateUserById(userId, updatedUser);
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:userId',
  /* requireUser, */ async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await getUserById(userId);
      if (!user) {
        res.status(404).send({
          name: 'No user found',
          message: 'No user with that id exists',
          error: 'UserDoesNotExistError',
        });
      } else {
        res.send(user);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:userId',
  /* requireAdmin, */ async (req, res, next) => {
    const { userId } = req.params;
    try {
      const result = await deleteUserById(userId);
      if (result) {
        res.send(result);
      } else {
        res.status(400).send({
          name: 'User Not Found',
          message: 'User already deleted',
          error: 'UserNotFoundError',
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

//USER CART ENDPOINTS:

// //GET user's cart - DO NOT NEED THIS IF GETTING USER RETURNS OBJECT THAT INCLUDES CART
// router.get( '/usersCart/:userId', /* requireUser, */ async (req, res, next) => {
//     try {
//       const { userId } = req.params;
//       const userCart = await getUserCartByUserId(userId);
//         res.send(userCart);
//     } catch (error) {
//       next(error);
//     }
//   }
// );


// PATCH to add product to users cart
router.patch('/usersCart/AddProduct/:userId', requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body
  try {
      
      const result = await addItemToUserCart(userId, productId, quantity);
      res.send(result);
  } catch (error) {
    next(error);
  }
});


// PATCH to update product quantity in users cart
router.patch('/usersCart/UpdateCart/:userId', requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { productId, quantity} = req.body
  try {
      const result = await updateProductQuantityInCart(userId, productId, quantity);
      res.send(result);
  } catch (error) {
    next(error);
  }
});

// PATCH to delete product in users cart
router.patch('/usersCart/DeleteProduct/:userId', requireUser, async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body
  try {
      const result = await deleteProductFromCart(userId, productId);
      res.send(result);
  } catch (error) {
    next(error);
  }
});


// DELETE to delete usersCart - Check to see if this will be handled in order history
router.patch('/usersCart/:userId', requireUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
      const result = await deleteUserCartByUserId(userId);
      res.send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
