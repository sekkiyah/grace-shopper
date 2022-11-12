const client = require('../client');

const {getProductImagesByProductId} = require('./product_images')
const {getProductReviewsByProductId} = require('./product_reviews') 
const {getPromoCodesByProductId} = require('./promo_codes');

async function createProduct({ name, description, price, inventory, thumbnailImage }) {
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

async function buildProductObject(product){
  
  product.productImages = await getProductImagesByProductId(product.id);
  product.categories = await getCategoryByProductId(product.id);
  product.reviews = await getProductReviewsByProductId(product.id);
  product.promo_codes = await getPromoCodesByProductId(product.id);

  return product;

}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE id=$1;
    `,
      [id]
    );
    buildProductObject(product)
    return product;
  } catch (error) {
    console.error('Error getting product by id');
    console.error(error);
  }
}

async function updateProduct({ id, ...fields }) {
  const { update } = fields;
  delete fields.tags;

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');

  try {
    if (setString.length > 0) {
      await client.query(
        `
      UPDATE products
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
        Object.values(fields)
      );
    }
    if (update === undefined) {
      return await getProductById(id);
    }
  } catch (error) {
    console.error('Error updating product');
    console.error(error);
  }
}

async function deleteProduct(id) {
  try {
    const { rows: deletedProduct } = await client.query(
      `
    DELETE FROM products
    WHERE id=$1
    RETURNING *;
    `,
      [id]
    );

    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product');
    console.error(error);
  }
}

async function attachProductToCategory(productId, categoryId) {
  try {
    const { rows: [productCategory] } = await client.query(`
    INSERT INTO product_categories(productId, categoryId)
    VALUES ($1, $2)
    RETURNING *;
    `, [productId, categoryId]);

    return productCategory;

  } catch (error) {
    console.error('Error attaching product to category');
    console.error(error);
  }
}

async function getProductsByCategory(categoryName) {
  try {
    const { rows: [products] } = await client.query(`
    SELECT products.*, categories.name AS 'categoryName'
    FROM products
    JOIN product_categories ON products.id=product_categories."productId"
    JOIN categories ON categories.id=product_categories."categoryId"
    WHERE categories.name=$1;
    `, [categoryName]);

    return products;

  } catch (error) {
    console.error('Error getting products by category');
    console.error(error);
  }
}

async function addProductToCart (userId, productId, quantity){
  const product = await getProductById(productId);
  if(product.inventory === 0){
    console.error('This item is out of stock');
  } else {
    try {
      const { rows: [userCartItem] } = await client.query(`
      INSERT INTO user_cart
      VALUES ($1, $2, $3)
      RETURNING *;
      `, [userId, productId, quantity]);

      return userCartItem;

    } catch (error) {
      console.error('Error adding product to cart');
      console.error(error);
    }
  }
}

async function updateProductQuantityInCart(productId, quantity){
  try {
    const { rows: updatedCartItem } = await client.query(`
    UPDATE user_cart
    SET quantity=$2
    WHERE "productId"=$1
    RETURNING *;
    `, [productId, quantity]);

    return updatedCartItem;

  } catch (error) {
    console.error("error updating product quantity in cart");
    console.error(error);
  }
}

async function deleteProductFromCart(productId){
  try {
    const { deletedCartProduct } = await client.query(`
    DELETE FROM user_cart
    WHERE "productId"=$1
    RETURNING *;
    `, [productId]);
    
    return deletedCartProduct;

  } catch (error) {
    console.error('Error deleting product from cart');
    console.error(error);
  }
}

async function getCategoryByProductId(productId){
  try {
    const {rows: [category] } = await client.query(`
    SELECT categories.* 
    FROM categories
    JOIN product_categories ON categories.id=product_categories."categoryId"
    WHERE product_categories."productId"=$1;
    `, [productId])

    return category;

  } catch (error) {
    console.error('Error getting category by productId');
    console.error(error);
  }
}


module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductFromCart,
  updateProductQuantityInCart,
  attachProductToCategory,
  getProductsByCategory,
  addProductToCart
};
