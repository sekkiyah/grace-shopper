import {React, useState, useEffect} from 'react';
import {getProducts} from '../api';

const Products = () => {
    const [products, setProducts] = useState([]);

    async function getProductsHelper(){
        const result = await getProducts();
        if(result){
            setProducts(result);
        }
    }
    
    useEffect(() => {
        getProductsHelper();
    }, []);

  return (
      <div className='productsContainer'>
          {
              products.map((product) => {
                  const { id, name, description, price, thumbnailImage} = product;
                  return (
                      <div className="products" key={id}>
                          <ul className="singleProduct">
                              <li><h3 className="productName">{name}</h3></li>
                              <li><p className="productDescription">{description}</p></li>
                              <li><p className="productPrice">{price}</p></li>
                              <img className="productImage">{thumbnailImage}</img>
                          </ul>
                      </div>
                  )
              })
          }
      </div>
  );
};

export default Products;