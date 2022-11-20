const express = require('express');
const router = express.Router();

const {getAllProducts, getProductById, updateProduct, createProduct, deleteProduct, checkProductName} = require('../db/tables');

router.get('/', async (req, res, next) => {
  try{
    const allProducts = await getAllProducts();
    if(!allProducts){
      res.send({
        name: 'No Products',
        message: 'No products were retrieved',
        error: 'NoProductsRetrieved'
      });
    } else {
      res.send(allProducts);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  const {productId} = req.params;
  try {
    const product = await getProductById(productId);
    if(!product){
      res.send({
        name: 'No Product',
        message: 'No product was retrieved',
        error: 'NoProductRetrieved'
      });
    } else {
      res.send(product);
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:productId', async (req, res, next) => {
  const {productId} = req.params;
  
  try {
    const product = await getProductById(productId);
    if(!product){
      res.status(404).send({
        name: 'Product Not Found',
        message: 'Product was not found in the database',
        error: 'ProductNotFoundError'
      });
    } else {
      const updatedProduct = {};
      for(key in req.body){
        updatedProduct[key] = req.body[key]
      }
      const result = await updateProduct({id: productId, ...updatedProduct});
      res.send(result);
    }

  } catch (error) {
    next(error);
  }
});

router.post('/', /* requireAdmin, */ async  (req, res, next) => {
  const {name} = req.body
  try {
    const existingProduct = await checkProductName(name);
    if(existingProduct){
      res.status(400).send({
        name: 'Product already exists',
        message: "A product with that name already exists",
        error: "ProductNameAlreadyExists"
      })
    } else {
      const productToCreate = {};
      for(key in req.body){
        productToCreate[key] = req.body[key]
      }
      const result = await createProduct(productToCreate);
      if(result){
        res.send(result);
      } 
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', /* requireAdmin, */ async (req, res, next) => {
  const {productId} = req.params;
  try {
    const result = await deleteProduct(productId);
    if(result){
      res.send(result);
    } else {
      res.status(400).send({
        name: "Product Not Found",
        message: "Product already deleted",
        error: "ProductNotFoundError"
      });
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;

