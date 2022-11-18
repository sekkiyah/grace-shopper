const express = require('express');
const promoCodesRouter = express.Router();
// const { requireAdmin } = require("./utils");
const { createPromoCode,
  getAllPromoCodes,
  updatePromoCode,
  deletePromoCode,
  getPromoCodesById,
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
  const updateObj = {};
  const { promo_codeId } = req.params;
  updateObj.id = promo_codeId
  const { productId, code, flatDiscount, percentDiscount } = req.body;


  try {
      if (await getPromoCodesById(promo_codeId)) {

      const promoCode = await getPromoCodesById(promo_codeId);

      if (productId) {
          updateObj.productId = productId;
      }
      if (code) {
          updateObj.code = code;
      } 
      if (flatDiscount || flatDiscount === null) {
          updateObj.flatDiscount = flatDiscount;
      }
      if (percentDiscount || percentDiscount === null) {
          updateObj.percentDiscount = percentDiscount;
      }
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
