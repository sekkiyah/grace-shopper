import {React, useState} from 'react';
import { Modal, Container, Button, Form} from "react-bootstrap";
import { createNewCategory } from '../api';

const AddCategory = ({getCategoriesHelper}) => {

    const [categoryName, setCategoryName] = useState('');
    const [showModal, setShowModal] = useState(false);
    
    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleCreateCategory(){
        await createNewCategory(categoryName);
        getCategoriesHelper();
        handleClose();
    }



    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Create Category</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>Create Category</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder='Enter Name For Category' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleCreateCategory()}>Create Category</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}


export default AddCategory;