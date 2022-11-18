const express = require('express');
const categoriesRouter = express.Router();
// const { requireAdmin } = require("./utils");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../db/tables/categories');

categoriesRouter.get('/', (req, res, next) => {
  res.send('categories API in progress');
});

categoriesRouter.use((req, res, next) => {
  console.log('A request is being made to /categories')
});

//GET /api/categories
categoriesRouter.get('/', async (req, res, next) => {
  try {
    const allCategories = await getAllCategories();

    res.send({
      allCategories
    })

  } catch (error) {
    res.send(error)
  }
});

//POST /api/categories
categoriesRouter.post('/', /*requireAdmin,*/ async (req, res, next) => {
  const { name } = req.body;

  const categoriesData = {};
  try {
    categoriesData.name = name;
    const category = await createCategory(categoriesData);

    res.send(category)
  } catch (error) {
    res.send(error)
  }
});

//PATCH /api/categories/categoryId
categoriesRouter.patch('/:categoryId', /*requireAdmin,*/ async (req, res, next) => {
  const { categoryId } = req.params.categoryId;
  const { name } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  try {
    const originalCategory = await getCategoryById(categoryId);
    const updatedCategory = await updateCategory(originalCategory, ...updateFields);

    res.send(updatedCategory)
  } catch (error) {
    res.send(error)
  }
});

//DELETE /api/category/categoryId
categoriesRouter.delete('/:categoryId', /*requireAdmin,*/ async (req, res, next) => {
  const category = await getCategoryById(req.params.categoryId);

  const deletedCategory = await deleteCategory(category.categoryId)
  try {
    if (deletedCategory) {
      res.send(deletedCategory)
    }
  } catch (error) {
    res.send(error)
  }
});

module.exports = categoriesRouter;
