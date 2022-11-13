const express = require('express');
const router = express.Router();

const {getAllProducts, getProductById} = require('../db/tables');

router.get('/', async (req, res, next) => {
  try{
    const allProducts = await getAllProducts();
    if(allProducts){
      res.send(allProducts);
    }

  } catch (error) {
    res.send(error)
  }
});

router.get('/:productId', async (req, res, next) => {
  const {productId} = req.params;
  try {
    const product = await getProductById(productId);
    if(product){
      res.send(product);
    }
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
