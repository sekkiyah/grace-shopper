const express = require('express');
const promoCodesRouter = express.Router();
// const { requireAdmin } = require("./utils");
const { createPromoCode,
  getAllPromoCodes,
  updatePromoCode,
  deletePromoCode,
  getPromoCodesById,
  getPromoCodesByProductId
} = require('../db/tables/promo_codes')


//GET /api/promo_codes
promoCodesRouter.get('/', /**requireAdmin, */ async (req, res, send) => {

  try {
  const promoCodes = await getAllPromoCodes();

    res.send(promoCodes);

  } catch (error) {
    res.send({
      name: 'PromoCodes Error',
      message: `Unable to get Promo Codes`,
      });
    next(error);;
  }
});

//GET /api/promo_codes/:promo_codeId
promoCodesRouter.get('/:promo_codeId', /**requireAdmin, */ async (req, res, send) => {
  const { promo_codeId } = req.params;
  try {
  const promoCode = await getPromoCodesById(promo_codeId);

    res.send(promoCode);

  } catch (error) {
    res.send({
      name: 'PromoCodes Error',
      message: `Unable to get Promo Code By ID`,
      });
    next(error);;
  }
});

//GET /api/promo_codes/products/:productId
promoCodesRouter.get('/products/:productId', /**requireAdmin, */ async (req, res, send) => {
  const { productId } = req.params;
  try {
  const promoCodes = await getPromoCodesByProductId(productId);

    res.send(promoCodes);

  } catch (error) {
    res.send({
      name: 'PromoCodes Error',
      message: `Unable to get Promo Code By Product ID`,
      });
    next(error);;
  }
});

//POST /api/promo_codes
promoCodesRouter.post('/', /**requireAdmin, */ async (req, res, next) => {
  try {
    const { productId, code, flatDiscount, percentDiscount } = req.body;

    const response = await createPromoCode({
      productId, 
      code, 
      flatDiscount, 
      percentDiscount
    });


    res.send(response);
  } catch (error) {
    res.send({
      name: 'PromoCodes Error',
      message: `Unable to create Promo Code`,
      });
    next(error);;
  }
});

//PATCH /api/promo_codes/:promo_codeId
promoCodesRouter.patch('/:promo_codeId', /**requireAdmin, */ async (req, res, next) => {
  const { promo_codeId } = req.params;
  
  try {
      if (await getPromoCodesById(promo_codeId)) {

      const promoCode = await getPromoCodesById(promo_codeId);

      const updateObj = {};
      updateObj.id = promo_codeId
      for(key in req.body){
        updateObj[key] = req.body[key]
      }
      console.log('updated obj is:', updateObj)
          const response = await updatePromoCode(updateObj);
          res.send(response);

      }  else {
          res.status(404);
          res.send({
          name: 'PromoCode Not Found',
          message: `PromoCode Id No.: ${promo_codeId} not found`,
          });
    }
  } catch (error) {
    res.send({
      name: 'PromoCodes Error',
      message: `Unable to update Promo Codes`,
      });
    next(error);;
  }
});

//DELETE /api/promo_codes/:promo_codeId

promoCodesRouter.delete('/:promo_codeId', /**requireAdmin, */  async (req, res, next) => {
  const { promo_codeId } = req.params;

  try {
    const response = await getPromoCodesById(promo_codeId);
      await deletePromoCode(promo_codeId);
      res.send(response);
  } catch (error) {
    res.send({
      name: 'PromoCodes Error',
      message: `Unable to delete Promo Code`,
      });
    next(error);;
  }
});

module.exports = promoCodesRouter;
