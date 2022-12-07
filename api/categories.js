const express = require('express');
const categoriesRouter = express.Router();
const { requireAdmin } = require("./utils");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../db/tables/categories');

//GET /api/categories
categoriesRouter.get('/', async (req, res, next) => {
  try {
    const allCategories = await getAllCategories();

    res.send(allCategories);
  } catch (error) {
    res.send({
      name: 'Categories Error',
      message: `API Unable to get All Categories`,
    });
    next(error);
  }
});

//GET /api/categories/:categoryId

categoriesRouter.get(
  '/:categoryId',
  /**requireAdmin, */ async (req, res, send) => {
    const { categoryId } = req.params;
    try {
      const category = await getCategoryById(categoryId);

      res.send(category);
    } catch (error) {
      res.send({
        name: 'Categories Error',
        message: `Unable to get Category By ID`,
      });
      next(error);
    }
  }
);

//POST /api/categories
categoriesRouter.post('/', async (req, res, next) => {
    const { name } = req.body;

    try {
      const category = await createCategory({ name });

      res.send(category);
    } catch (error) {
      res.send({
        name: 'Categories Error',
        message: `API Unable to create new Categories`,
      });
      next(error);
    }
  }
);

//PATCH /api/categories/categoryId
categoriesRouter.patch(
  '/',
  /*requireAdmin,*/ async (req, res, next) => {
    const { categoryId } = req.body;
    try {
      const updatedCategory = {};
      for(key in req.body){
        updatedCategory[key] = req.body[key]
      }
      const result = await updateCategory({ id: categoryId, ...updatedCategory });
      if(result){
        res.send(result)
      }
    } catch (error) {
      res.send({
        name: 'Categories Error',
        message: `API Unable to update Category`,
      });
      next(error);
    }
  }
);

//DELETE /api/category/categoryId
categoriesRouter.delete(
  '/:categoryId',
  /*requireAdmin,*/ async (req, res, next) => {
    const { categoryId } = req.params;
    try {
      const deletedCategory = await deleteCategory(categoryId);

      res.send(deletedCategory);
    } catch (error) {
      res.send({
        name: 'Categories Error',
        message: `API Unable to delete Category`,
      });
      next(error);
    }
  }
);

module.exports = categoriesRouter;
