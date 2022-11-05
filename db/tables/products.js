const client = require('../client');

async function createProduct({ name, description, price, inventory, thumbnailImage}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, inventory, "thumbnailImage")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
      [name, description, price, inventory, thumbnailImage]
    );

    return product;

  } catch (error) {
    console.error('Error creating product');
    console.error(error);
  }
}
async function getProductById(id){
  try {
    const {rows: [product] } = await client.query(`
    SELECT *
    FROM products
    WHERE id=$1;
    `, [id]);

    return product

  } catch (error) {
    console.error('Error getting product by id');
    console.error(error)
  }
}
async function updateProduct({ id, ...fields}){
  const { update } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if(setString.length > 0){
      await client.query(`
      UPDATE products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
      Object.values(fields))
    };
    if(update === undefined){
      return await getProductById(id)
    }

  } catch (error) {
    console.error('Error updating product');
    console.error(error);
  }
}
async function deleteProduct(id){
  try {
    const { rows: deletedProduct } = await client.query(`
    DELETE FROM products
    WHERE id=$1
    RETURNING *;
    `, [id]);
    
    return deletedProduct;

  } catch (error) {
    console.error('Error deleting product');
    console.error(error)
  }
}


module.exports = {
  createProduct,
};
