import React, {useState} from "react";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { updateProduct, deleteProduct} from "../api";

const EditProduct = ({token, products, productId, getProductsHelper}) => {
    const [currentProduct] = products.filter((product) => product.id === productId);
    const {id, name, description, price, inventory} = currentProduct;
    const [newPrice, setNewPrice] = useState(price);
    const [newDescription, setNewDescription] = useState(description);
    const [newName, setNewName] = useState(name);
    const [newInventory, setNewInventory] = useState(inventory);
    const [showModal, setShowModal] = useState(false);
    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleProductUpdate(){
        const updatedProduct = {
            id: id,
            name: newName,
            description: newDescription,
            price: newPrice,
            inventory: newInventory
        }
        
        await updateProduct(token, updatedProduct);
        getProductsHelper();
        handleClose();
    }

    async function handleDeleteProduct(){
        await deleteProduct(token, id);
        getProductsHelper();
        handleClose();
    }


    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Edit</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>{name}</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder={name} onChange={(e) => setNewName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder={description} onChange={(e) => setNewDescription(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder={price} onChange={(e) => setNewPrice(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Inventory</Form.Label>
                            <Form.Control type="text" placeholder={inventory} onChange={(e) => setNewInventory(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleProductUpdate()}>Save Changes</Button>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleDeleteProduct()}>Delete Product</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditProduct;