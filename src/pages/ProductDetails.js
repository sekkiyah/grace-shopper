import { Card, Container, Carousel, CarouselItem, Button, Collapse} from "react-bootstrap";
import { React, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
const ProductDetails = () => {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductReviews, setCurrentProductReviews] = useState([]);
  const [currentProductImages, setCurrentProductImages] = useState([]);
  const [currentProductCategories, setCurrentProductCategories] = useState([]);
  const [open, setOpen] = useState(false);
  
  const { id, name, description, price } =
    currentProduct;
  
  console.log(currentProduct);
  console.log(currentProductReviews)

  async function getSingleProductHelper() {
    const result = await getProductById(productId);
    setCurrentProduct(result);
    setCurrentProductReviews(result.reviews);
    setCurrentProductImages(result.productImages);
    setCurrentProductCategories(result.categories);
  }

  useEffect(() => {
    getSingleProductHelper();
  }, []);

  return (
    <div className="d-flex flex-column" >

      <Card
        border="success"
        className="text-center bg-light"
        key={id}
      >
      <Carousel className="text-center">
        {currentProductImages.length
          ? currentProductImages.map((image) => {
              const { imageURL } = image;
              return (
                <CarouselItem key={Math.ceil(Math.random() * 1000000000 - 1)}>
                  <img src={imageURL.toString()}></img>
                </CarouselItem>
              );
            })
          : null}
      </Carousel>
        <Card.Body>
          <Card.Title className="text-primary fs-2">{name}</Card.Title>
          {
            currentProductCategories.length ? 
            (<Card.Text className="text-dark">
              Categories: {currentProductCategories.map((category) => {return category.name})} 
              </Card.Text>) : null
          }
          <Card.Text className="text-dark">Description: {description}</Card.Text>
          <Card.Text className="text-dark">Price: ${price}</Card.Text>
        </Card.Body>
        {
          currentProductReviews.length ? (
            <div>
                <Button 
                className="btn btn-primary" 
                onClick={() => setOpen(!open)}
                aria-controls="reviews"
                aria-expanded={open}
                >Reviews</Button>

              <Collapse in={open}>
              <div className="collapse" id="reviews">
                {
                  currentProductReviews.map((review) => {
                    const {id, userId, rating, title, content} = review;
                    return (
                      <Container key={id}>
                        <p className="">Title: {title}</p>
                        <p>User: {userId}</p>
                        <p>Rating: {rating}/5</p>
                        <p>Review: {content}</p>
                      </Container>
                    )
                  })
                }
              </div>
              </Collapse>
            </div>
          ) : null
        }
      </Card>
    </div>
  );
};

export default ProductDetails;
