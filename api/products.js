const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('products API in progress');
});

module.exports = router;
