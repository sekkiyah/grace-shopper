const client = require('../client');

async function createProductImage(productImage) {
    try {

      const columnNames = Object.keys(productImage).join('", "');
      const valueString = Object.keys(productImage).map((key, index) => `$${index + 1}`).join();

        const { rows: [newProductImage] } = await client.query(`
            INSERT INTO product_images("${columnNames}")
            VALUES (${valueString})
            RETURNING *;
        `, Object.values(productImage))

        return newProductImage;

    } catch (error) {
        console.error("Error creating product image");
        throw error;
    }
};

async function getProductImagesByProductId(productId){
    try {
        const {rows: productImages} = await client.query(`
        SELECT *
        FROM product_images
        WHERE "productId"=$1;
        `, [productId]);

        productImages.forEach((productImage) => {
            delete productImage.productId
        });

        return productImages;

    } catch (error) {
        console.error("Error getting product image by 'productId'");
        throw error;
    }
};

async function updateProductImageByProductId({productId, ...newProductImage}) {
    

    const setString = Object.keys(newProductImage)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    try {
        if(setString.length > 0){
            await client.query(`
            UPDATE product_images
            SET ${setString}
            WHERE "productId"=${productId}
            RETURNING *;
            `, Object.values(newProductImage));
        }
        if(newProductImage === undefined){
            return await getProductImagesByProductId(productId);
        }
    } catch (error) {
        console.error("Error updating product image");
        throw error;
    }
};

async function deleteProductImageByProductId(productId) {
    try {
        const { rows: deletedProductImage } = await client.query(`
        DELETE FROM product_images
        WHERE "productId"=$1
        RETURNING *;
    `, [productId]);

    return deletedProductImage;
    } catch (error) {
        console.error("Error deleting product image");
        throw error;
    }
};


module.exports = {
    createProductImage,
    getProductImagesByProductId,
    updateProductImageByProductId,
    deleteProductImageByProductId
};
