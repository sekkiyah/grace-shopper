const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('users API in progress');
});

module.exports = router;
