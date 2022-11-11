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

async function getProductReviewsByProductId(productId){
    try {
        const {rows} = await client.query(`
        SELECT *
        FROM product_reviews
        WHERE "productId"=$1;
        `, [productId]);

        rows.forEach((row) => {
          delete row.productId
        });

        return rows;

    } catch (error) {
        console.error("Error getting product review by 'productId'");
        console.error(error);
    }
};

async function getProductReviewsByUserId(userId){
  try {
      const {rows} = await client.query(`
      SELECT *
      FROM product_reviews
      WHERE "userId"=$1;
      `, [userId]);

      return rows;

  } catch (error) {
      console.error("Error getting product review by 'userId'");
      console.error(error);
  }
};

async function updateProductReview({id, ...fields}){

    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE product_reviews
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getProductReviewById(id);
        }
        
    } catch (error) {
        console.error("Error updating product review");
        console.error(error);
    }
};

async function deleteProductReviewById(id){
    try {
        const { rows: [deletedProductReview] } = await client.query(`
        DELETE FROM product_reviews
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
        return deletedProductReview;
        
    } catch (error) {
        console.error("Error deleting product review");
        console.error(error);
    }
};

module.exports = {
    createProductReview,
    getProductReviewsByProductId,
    getProductReviewsByUserId,
    updateProductReview,
    deleteProductReviewById
};
