const client = require('../client');

async function createCategory({ name }) {
  try {
    const {
      rows: [category],
    } = await client.query(`
      INSERT INTO categories(name)
      VALUES ('${name}')
      ON CONFLICT (name) DO NOTHING
      RETURNING *;`);

    return category;
  } catch (error) {
    console.error('Error creating category');
    throw error;
  }
}

async function getAllCategories() {
  try {
    const { rows: categories } = await client.query(`
      SELECT *
      FROM categories;`);

    return categories;
  } catch (error) {
    console.error('Error getting all categories');
    throw error;
  }
}

async function getCategoryById(id) {
  try {
    const {
      rows: [category],
    } = await client.query(`
      SELECT *
      FROM category
      WHERE id=${id};`);

    return category;
  } catch (error) {
    console.error('Error getting category by id');
    throw error;
  }
}

async function updateCategory(id, newName) {
  if (newName === undefined) {
    console.error('New name not given');
    return;
  }
  try {
    const {
      rows: [category],
    } = await client.query(`
      UPDATE categories
      SET name='${newName}'
      WHERE id=${id}
      RETURNING *;`);

    return category;
  } catch (error) {
    console.error('Error updating category');
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    const {
      rows: [deletedCategory],
    } = await client.query(`
      DELETE FROM categories
      WHERE id=${id}
      RETURNING *;`);

    return deletedCategory;
  } catch (error) {
    console.error('Error deleting category');
    throw error;
  }
}

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
