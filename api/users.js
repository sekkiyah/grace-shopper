const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  getUserByUsername,
  createUser,
  checkIfUserExists,
  loginUser,
  updateUserById,
  getUserById,
  deleteUserById,
} = require('../db/tables');
// const { deleteUser } = require('../src/api');

router.get('/', async (req, res, next) => {
  res.send('users API in progress');
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const checkUser = await checkIfUserExists(username, email);
    console.log(checkUser);
    if (checkUser && checkUser.username === username) {
      res.status(500).send({
        name: 'Username Taken',
        message: `Username: ${username} is already in use`,
        error: 'UsernameTakenError',
      });
    } else if (checkUser && checkUser.email === email) {
      res.status(500).send({
        name: 'Email Taken',
        message: `Email: ${email} is already in use`,
        error: 'EmailTakenError',
      });
    } else {
      const user = await createUser({ email, username, password });
      const role = user.isAdmin ? 'admin' : 'user';
      const token = jwt.sign({ username, userId: user.id, role }, process.env.JWT_SECRET);
      res.send({ message: 'Hurray, You are registered', user, token });
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

router.get(
  '/me',
  /* requireUser, */ async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:userId',
  /* requireAdmin, */ async (req, res, next) => {
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
  }
);

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

module.exports = router;
