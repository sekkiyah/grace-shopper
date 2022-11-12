const client = require('../client');

async function createProductCategory ({productId, categoryId}) {
    try {
        const { rows: [productCategory] } = await client.query(`
            INSERT INTO product_categories("productId", "categoryId")
            VALUES ($1, $2)
            RETURNING *;
            `, [productId, categoryId])

            return productCategory;

    } catch (error) {
        console.error("Error creating product category");
        console.error(error);
    }
};

async function getProductCategoryByProductId(productId){
    try {
        const {rows: [productCategory]} = await client.query(`
        SELECT *
        FROM product_categories
        WHERE "productId"=$1;
        `, [productId]);

        return productCategory;

    } catch (error) {
        console.error("Error getting product category by 'productId'");
        console.error(error);
    }
};

async function deleteProductCategoryByProductId (productId) {
    try {
        const { rows: deletedProductCategory } = await client.query(`
        DELETE FROM product_categories
        WHERE "productId"=$1
        RETURNING *;
    `, [productId]);

    return deletedProductCategory;

    } catch (error) {
        console.error("Error deleting product category");
        console.error(error);
    }
};

module.exports = {
    createProductCategory,
    getProductCategoryByProductId,
    deleteProductCategoryByProductId
};

