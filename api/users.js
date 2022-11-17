const express = require('express');
const router = express.Router();
const {getUserByUsername, createUser} = require('../db/tables/users');

router.get('/', async (req, res, next) => {
  res.send('users API in progress');
});

router.post('/register', async (req, res, next) => {
  try {
    const {email, username, password} = req.body;
    const checkUser = await getUserByUsername(username);
    if(checkUser){
      res.status(401);
      res.send({
        error: `Either ${username} or ${email} is already being used`
      })
    } else {
      const user = await createUser({email, username, password});
      res.send({user, message: "Hurray, You are registered"})
    }
  } catch (error) {
    console.error("API register error");
    next(error);
  }
})

module.exports = router;
