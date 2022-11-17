const client = require('../client');

async function getProductReviewById(productReviewId) {
  try {
    const {
      rows: [productReview],
    } = await client.query(
      `
    SELECT *
    FROM product_reviews
    WHERE id=$1;
    `,
      [productReviewId]
    );

    return productReview;
  } catch (error) {
    console.error('Error getting product review by id');
    throw error;
  }
}
async function createProductReview(productReview) {
  try {
    const columnNames = Object.keys(productReview).join('", "');
    const valueString = Object.keys(productReview)
      .map((key, index) => `$${index + 1}`)
      .join();

    const {
      rows: [newProductReview],
    } = await client.query(
      `
        INSERT INTO product_reviews("${columnNames}")
        VALUES (${valueString})
        RETURNING *;`,
      Object.values(productReview)
    );

    return newProductReview;
  } catch (error) {
    console.error('Error creating product review');
    throw error;
  }
}

async function getProductReviewsByProductId(productId) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM product_reviews
        WHERE "productId"=$1;
        `,
      [productId]
    );

    rows.forEach(row => {
      delete row.productId;
    });

    return rows;
  } catch (error) {
    console.error("Error getting product review by 'productId'");
    throw error;
  }
}

async function getProductReviewsByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM product_reviews
      WHERE "userId"=$1;
      `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error("Error getting product review by 'userId'");
    throw error;
  }
}

async function updateProductReview({ id, ...productReview }) {
  const setString = Object.keys(productReview)
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
        Object.values(productReview)
      );
    }
    if (productReview === undefined) {
      return await getProductReviewById(id);
    }
  } catch (error) {
    console.error('Error updating product review');
    throw error;
  }
}

async function deleteProductReviewById(id) {
  try {
    const {
      rows: [deletedProductReview],
    } = await client.query(
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
    throw error;
  }
}

async function deleteProductReviewsByUserId(userId) {
  try {
    const { rows: deletedProductReviews } = await client.query(
      `
      DELETE FROM product_reviews
      WHERE "userId"=${userId}
      RETURNING *;`
    );
    return deletedProductReviews;
  } catch (error) {
    console.error('Error deleting product review by user id');
    throw error;
  }
}

module.exports = {
  createProductReview,
  getProductReviewsByProductId,
  getProductReviewsByUserId,
  updateProductReview,
  deleteProductReviewById,
  deleteProductReviewsByUserId,
};
