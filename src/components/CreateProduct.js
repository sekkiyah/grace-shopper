import {React, useState} from "react";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { createNewProduct } from "../api";
const CreateProduct = ({token, getProductsHelper}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }
    async function handleCreateProduct(){
        const newProduct = {
            name: name,
            description: description,
            price: price,
            inventory: inventory,
            thumbnailImage: thumbnailImage
        }
        await createNewProduct(token, newProduct);
        getProductsHelper();
        handleClose();

    }

    return (
        <Container>
        <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Create Product</Button>
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Title>Create Category</Modal.Title>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder='Enter Name For Product' onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder='Enter Description For Product' onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder='Enter Price For Product' onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inventory</Form.Label>
                        <Form.Control type="text" placeholder='Enter Inventory For Product' onChange={(e) => setInventory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thumbnail Image</Form.Label>
                        <Form.Control type="text" placeholder='Enter Thumbnail Image For Product' onChange={(e) => setThumbnailImage(e.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleCreateProduct()}>Create Product</Button>
                <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    </Container>
    )
}

export default CreateProduct;