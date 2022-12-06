const express = require('express');
const { useParams } = require('react-router-dom');
const router = express.Router();
const { createProductCategory, getProductCategory} = require('../db/tables');
const { requireAdmin } = require('./utils');

router.post('/', async (req, res, next) => {
    const {productId, categoryId} = req.body;
    try {
       const existingProductCategory = await getProductCategory(productId, categoryId);
        if(existingProductCategory){
            res.status(400).send({
                name: 'Product Category already exists',
                message: "The product already has that category attached",
                error: "ProductCategoryAlreadyExists"
              })
        } else {
        const productCategoryToCreate = {};
        for(key in req.body){
        productCategoryToCreate[key] = req.body[key]
            }
        const result = await createProductCategory(productCategoryToCreate);
        if(result){
        res.send(result);
            } 
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/')


module.exports = router;