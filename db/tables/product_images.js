const client = require('../client');

async function createProductImage({ productId, imageURL }) {
    try {
        const { rows: [productImage] } = await client.query(`
            INSERT INTO product_images("productId", "imageURL")
            VALUES ($1, $2)
            RETURNING *;
        `, [productId, imageURL])

        return productImage;

    } catch (error) {
        console.error("Error creating product image");
        console.error(error);
    }
}

async function getProductImageById(id){
    try {
        const {rows: [productImage]} = await client.query(`
        SELECT *
        FROM product_images
        WHERE id=$1;
        `, [id]);

        return productImage;

    } catch (error) {
        console.error("Error getting product image by id");
        console.error(error);
    }
}

async function updateProductImage({id, ...fields}) {
    const { update } = fields;

    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE product_images
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `, Object.values(fields));
        }
        if(update === undefined){
            return null;
        }
    } catch (error) {
        console.error("Error updating product image");
        console.error(error);
    }
}

async function deleteProductImage(id) {
    try {
        const { rows: deletedProductImage } = await client.query(`
        DELETE FROM product_images
        WHERE id=$1
        RETURNING *;
    `, [id]);

    return deletedProductImage;
    } catch (error) {
        console.error("Error deleting product image");
        console.error(error);
    }
}

module.exports = {
    createProductImage,
    getProductImageById,
    updateProductImage,
    deleteProductImage
};
