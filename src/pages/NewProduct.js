import React from 'react';
import { createNewProduct } from '../api';
import { Container, Button, Form } from "react-bootstrap";

const NewProduct = ({ token, fetchProducts, navigate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');

    const addProduct = async () => {
        const results = await createNewProduct(token, { name, description, price, thumbnailImage });
        if (results) {
            fetchProducts();
            navigate('/products')
        } else {
            alert("Error creating new product.")
        }
    }

    return (
        <Container>
            <h3>Add a new product</h3>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    addProduct();
                }}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name here..." value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description here..." value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter price here..." value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" type="submit">Update</Button>
            </Form>
        </Container>
    );
};

export default NewProduct;