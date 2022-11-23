import {React, useState, useEffect} from 'react';
import {getProducts} from '../api';
import { Card, CardGroup, Container, Row, Col} from 'react-bootstrap';
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
      <Container>
          <Row>
          {
              products.map((product) => {
                  const { id, name, description, price, thumbnailImage} = product;
                  return (
                      <Card border='success' style={{ width: '18rem' }} className="products" key={id}>
                          <Card.Img variant="top" src={thumbnailImage}></Card.Img>
                          <Card.Body>
                              <Card.Title>{name}</Card.Title>
                              <Card.Text>{description}</Card.Text>
                              <Card.Text>${price}</Card.Text>
                          </Card.Body>
                          
                      </Card>
                  )
              })
          }
          </Row>
    </Container>
  );
};

export default Products;