import {React, useState, useEffect} from 'react';
import {getAllProducts, getAllCategories} from '../api';
import { Link } from 'react-router-dom';
import { Card, CardGroup, Container, Row, Col, Button, Navbar, NavDropdown, NavbarBrand, Nav} from 'react-bootstrap';
import {ProductDetails} from './index';
const Products = () => {

    useEffect(() => {
        getProductsHelper();
    }, []);
    useEffect(() => {
        getCategoriesHelper();
    }, []);
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [targetCategory, setTargetCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    async function getProductsHelper(){
        const result = await getAllProducts();
        if(result){
            setProducts(result);
        }
    }
    async function getCategoriesHelper(){
        const result = await getAllCategories();
        if(result){
            setCategories(result);
        }
    }
    const handleSelectCategory = (eventKey, event) => {
        event.preventDefault();
        setTargetCategory(eventKey);
    }
    
    const filteredOut = products.filter((product) => {
        if(product.categories.length){
            const {categories: [array]} = product;
            const {name: data} = array;
            if(data === targetCategory){
                return product;
                
            }
        }
    })
    async function handleFilterProducts(){
        if(filteredOut.length){
            setFilteredProducts(filteredOut);
        }
    }

    useEffect(() => {
        handleFilterProducts();
    }, [targetCategory])
    
    const productsToDisplay = !filteredProducts.length || targetCategory === 'All' ?  products : filteredProducts
    
    return (
        <Container className='d-flex flex-column align-items-center mt-3'>
          <Navbar expand="lg" className="border border-dark rounded-pill mb-4 ms-5 me-5 w-50 bg-opacity-50 shadow p-3 mb-5 bg-danger rounded">
            <Container className='justify-content-center border border-dark rounded-pill p-2 mx-auto bg-danger bg-opacity-75'>
                <NavbarBrand className='fs-3 fw-bold text-decoration-underline'>Products</NavbarBrand>
                    <Nav className='text-light'>
                        <NavDropdown value={targetCategory} onSelect={handleSelectCategory} title={<span className='fs-5 text-light'>Categories</span>} className='fs-5 fw-bold' id='basic-nav-dropdown'>
                            <NavDropdown.Item eventKey='All'>All</NavDropdown.Item>
                            <NavDropdown.Divider></NavDropdown.Divider>
                            {
                                categories.length ? (categories.map((category) => {
                                    return (
                                        <NavDropdown.Item key={category.id} eventKey={category.name}>{category.name}</NavDropdown.Item>
                                    )
                                })) : null
                            }
                        </NavDropdown>
                    </Nav>
            </Container>
          </Navbar>
          <Row  className='row justify-content-center' md={4}>
          {
              productsToDisplay.map((product) => {
                  const { id, name, description, price, thumbnailImage} = product;
                  return (
                      <Card style={{ width: '20rem' }} className='mx-5 mb-4 d-flex flex-column border border-danger shadow p-3 mb-5 bg-body rounded' key={id}>
                          <Card.Img variant="top" src={thumbnailImage}></Card.Img>
                          <Card.Body className='d-flex flex-column mt-auto'>
                              <Card.Title>{name}</Card.Title>
                              <Card.Text>{description}</Card.Text>
                              <Card.Text>${price}</Card.Text>
                              <Link className="mt-auto" to={`/products/${id}`}>
                                <Button className='bg-danger border border-dark bg-opacity-75 text-dark fw-bold'>View Product Details</Button>
                              </Link>
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