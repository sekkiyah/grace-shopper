const client = require('../client');

async function createProductReview({ productId, userId, rating, title, content }) {
  try {
    const {
      rows: [productReview],
    } = await client.query(
      `
        INSERT INTO product_reviews("productId", "userId", rating, title, content)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
      [productId, userId, rating, title, content]
    );

    return productReview;
  } catch (error) {
    console.error('Error creating product review');
    console.error(error);
  }
}

async function getProductReviewById(id) {
  try {
    const {
      rows: [productReview],
    } = await client.query(
      `
        SELECT *
        FROM product_reviews
        WHERE id=$1;`,
      [id]
    );

    return productReview;
  } catch (error) {
    console.error('Error getting product review by id');
    console.error(error);
  }
}

async function updateProductReview({ id, ...fields }) {
  const { update } = fields;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    if (setString.length > 0) {
      await client.query(
        `
            UPDATE product_reviews
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
        Object.values(fields)
      );
    }
    if (update === undefined) {
      return await getProductReviewById(id);
    }
  } catch (error) {
    console.error('Error updating product review');
    console.error(error);
  }
}

async function deleteProductReview(id) {
  try {
    const { rows: deletedProductReview } = await client.query(
      `
        DELETE FROM product_reviews
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );

    return deletedProductReview;
  } catch (error) {
    console.error('Error deleting product review');
    console.error(error);
  }
}

module.exports = {
  createProductReview,
  getProductReviewById,
  updateProductReview,
  deleteProductReview,
};
