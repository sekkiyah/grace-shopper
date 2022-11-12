const client = require('../client');

<<<<<<< HEAD
=======

>>>>>>> e86eaf7fcd5bed7dfef7997266c842f15f1dc9df
async function createCategory({name}) {
    try {
        const { rows: [category] } = await client.query(`
            INSERT INTO categories(name)
            VALUES ($1)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `, [name]);

            return category;

    } catch (error) {
        console.error('Error creating category');
        throw error;
    }
};

async function getCategoryById(id) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
        SELECT *
        FROM category
        WHERE id=$1;
        `,
      [id]
    );

        return category;
    } catch (error) {
        console.error("Error getting category by id");
        throw error;
    }
};

async function updateCategory({ id, ...fields }) {
  const { update } = fields;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    if (setString.length > 0) {
      await client.query(
        `
            UPDATE categories
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
        Object.values(fields)
      );

    }
    if (update === undefined) {
      return await getCategoryById(id);
    }
  } catch (error) {
    console.error('Error updating category');
    console.error(error);
  }
}

async function deleteCategory(id) {
  try {
    const { rows: [deletedCategory] } = await client.query(
      `
            DELETE FROM categories
            WHERE id=$1
            RETURNING *;`, [id]
    );

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
};
