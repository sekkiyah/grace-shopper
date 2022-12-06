const client = require('../client');

async function createProductCategory (productCategory) {
    try {
        const columnNames = Object.keys(productCategory).join('", "');
        const valueString = Object.keys(productCategory).map((key, index) => `$${index + 1}`).join();

        const { rows: [newProductCategory] } = await client.query(`
            INSERT INTO product_categories("${columnNames}")
            VALUES (${valueString})
            RETURNING *;
            `, Object.values(productCategory))

            return newProductCategory;

    } catch (error) {
        console.error("Error creating product category");
        throw error;
    }
};

async function getProductCategoriesByProductId(productId){
    try {
        const {rows: [productCategory]} = await client.query(`
        SELECT *
        FROM product_categories
        WHERE "productId"=$1;
        `, [productId]);

        return productCategory;

    } catch (error) {
        console.error("Error getting product category by 'productId'");
        throw error;
    }
};

async function deleteProductCategoriesByProductId (productId) {
    try {
        const { rows: deletedProductCategory } = await client.query(`
        DELETE FROM product_categories
        WHERE "productId"=$1
        RETURNING *;
    `, [productId]);

    return deletedProductCategory;

    } catch (error) {
        console.error("Error deleting product category");
        throw error;
    }
};

async function deleteProductCategory (productId, categoryId) {
    try {
        const { rows: deletedProductCategory } = await client.query(`
        DELETE FROM product_categories
        WHERE "productId"=$1
        AND "categoryId"=$2
        RETURNING *;
        `, [productId, categoryId]);

        return deletedProductCategory;

    } catch (error) {
        console.error("Error deleting product category");
        throw error;
    }
}

async function getProductCategory (productId, categoryId) {
    try {
        const { rows: [productCategory] } = await client.query(`
        SELECT *
        FROM product_categories
        WHERE "productId"=$1
        AND "categoryId"=$2;
        `, [productId, categoryId]);

        return productCategory;

    } catch (error) {
        console.error("Error getting product category");
        throw error;
    }
}

module.exports = {
    createProductCategory,
    getProductCategoriesByProductId,
    deleteProductCategoriesByProductId,
    getProductCategory,
    deleteProductCategory
};

