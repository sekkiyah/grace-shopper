const express = require('express');
const router = express.Router();
const {getUserByUsername, createUser, checkIfUserExists, loginUser} = require('../db/tables/users');

router.get('/', async (req, res, next) => {
  res.send('users API in progress');
});

router.post('/register', async (req, res, next) => {
  try {
    const {email, username, password} = req.body;
    const checkUser = await checkIfUserExists(username, email);
    console.log(checkUser)
    if(checkUser && checkUser.username === username){
      res.status(401);
      res.send({
        name: 'Username Taken',
        message: `Username: ${username} is already in use`,
        error: 'UsernameTakenError'
      })
    } else if(checkUser && checkUser.email === email){
      res.status(401);
      res.send({
        name: 'Email Taken',
        message: `Email: ${email} is already in use`,
        error: 'EmailTakenError'
      })
    } else {
      const user = await createUser({email, username, password});
      res.send({user, message: "Hurray, You are registered"})
    }
  } catch (error) {
    console.error("API register error");
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    if(!username || !password){
      res.status(401);
      res.send({
        name: 'Incomplete Fields',
        message: 'Must supply both username and password',
        error: 'IncompleteFieldsError'
      });
    } else {
      const user = await loginUser({username, password});
      if(!user){
        res.status(401);
        res.send({
          name: 'Incorrect Login Info',
          message: 'Username or password is incorrect',
          error: 'IncorrectLoginInfoError'
        });
      } else {
        res.send({user, message: 'You are logged in!'});
      }
    }
  } catch (error) {
    console.error('API login error');
    next(error);
  }
})

module.exports = router;
