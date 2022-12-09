import { Card, Container, Carousel, CarouselItem, Button, Collapse } from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api';
import { AddProductToCart } from '../components';
const ProductDetails = ({ token, user, getUserCart }) => {
  let { productId } = useParams();
  productId = parseInt(productId);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductReviews, setCurrentProductReviews] = useState([]);
  const [currentProductImages, setCurrentProductImages] = useState([]);
  const [currentProductCategories, setCurrentProductCategories] = useState([]);

  const [open, setOpen] = useState(false);

  const { id, name, description, price } = currentProduct;

  async function getSingleProductHelper() {
    const result = await getProductById(productId);
    setCurrentProduct(result);
    if (result.reviews) {
      setCurrentProductReviews(result.reviews);
    }
    if (result.productImages) {
      setCurrentProductImages(result.productImages);
    }
    if (result.categories) {
      setCurrentProductCategories(result.categories);
    }
  }

  useEffect(() => {
    getSingleProductHelper();
  }, []);

  return (
    <Container className='mb-5'>
      <Card className='bg-light bg-opacity-25 border border-dark' key={id}>
        <Card.Body className='d-flex flex-column align-items-center'>
          <Card.Title className='text-danger  fs-2 fw-bold'>{name}</Card.Title>
          <Carousel className='text-center mt-2 border border-success rounded-pill bg-danger bg-opacity-75 w-75 shadow p-3 mb-5 rounded'>
            {currentProductImages.length &&
              currentProductImages.map((image, idx) => {
                const { imageURL } = image;
                return (
                  <CarouselItem key={idx}>
                    <img className='rounded mt-1 mb-1 border border-dark border-2' src={imageURL.toString()}></img>
                  </CarouselItem>
                );
              })}
          </Carousel>
          {currentProductCategories.length ? (
            <Card.Text className='text-dark'>
              Categories:{' '}
              {currentProductCategories.map(category => {
                return category.name + ' ';
              })}
            </Card.Text>
          ) : (
            <></>
          )}
          <Card.Text className='text-dark fs-5'>Description: {description}</Card.Text>
          <Card.Text className='text-dark fs-5 fw-bold'>Price: ${price}</Card.Text>
          <AddProductToCart
            user={user}
            productId={productId}
            token={token}
            getUserCart={getUserCart}></AddProductToCart>
        </Card.Body>
        {currentProductReviews.length ? (
          <Container className='d-flex flex-column align-items-center'>
            <Button
              className='bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3'
              onClick={() => setOpen(!open)}
              aria-controls='reviews'
              aria-expanded={open}>
              Customer Reviews
            </Button>

            <Collapse in={open}>
              <Container className='collapse border border-3 mb-5 bg-danger bg-opacity-25' id='reviews'>
                {currentProductReviews.map(review => {
                  const { id, userId, rating, title, content } = review;
                  return (
                    <Container key={id} className='mb-5 mt-5'>
                      <p className='fs-3 fw-bold'>{title}</p>
                      <p>User: {userId}</p>
                      <p className='fw-bold'>Rating: {rating}/5</p>
                      <p>{content}</p>
                    </Container>
                  );
                })}
              </Container>
            </Collapse>
          </Container>
        ) : (
          <></>
        )}
      </Card>
    </Container>
  );
};

export default ProductDetails;
