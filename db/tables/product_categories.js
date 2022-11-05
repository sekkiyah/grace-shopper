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
}

async function getProductCategoryById(id){
    try {
        const {rows: [productCategory]} = await client.query(`
        SELECT *
        FROM product_categories
        WHERE id=$1;
        `, [id]);

        return productCategory;

    } catch (error) {
        console.error("Error getting product category by id");
        console.error(error);
    }
}

async function updateProductCategory ({id, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE product_categories
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return await getProductCategoryById(id);
        }
    } catch (error) {
        console.error("Error updating product category");
        console.error(error);
    }
}

async function deleteProductCategory (id) {
    try {
        const { rows: deletedProductCategory } = await client.query(`
        DELETE FROM product_categories
        WHERE id=$1
        RETURNING *;
    `, [id]);

    return deletedProductCategory;

    } catch (error) {
        console.error("Error deleting product category");
        console.error(error);
    }
}
module.exports = {
    createProductCategory,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
};
