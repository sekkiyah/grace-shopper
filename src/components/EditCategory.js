import React, {useState} from "react";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { deleteCategory, updateCategory } from "../api";

const EditCategory = ({token, categoryId, getCategoriesHelper, categoryName}) => {
    
    const [newName, setNewName] = useState('');
    const [showModal, setShowModal] = useState(false);

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleCategoryUpdate(){
        const updatedCategory = {
            id: categoryId,
            name: newName
        }
        await updateCategory(token, updatedCategory);
        getCategoriesHelper();
        handleClose();
    }

    async function handleDeleteCategory(){
        await deleteCategory(token, categoryId);
        getCategoriesHelper();
        handleClose();
    }


    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Edit</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>{categoryName}</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder={categoryName} onChange={(e) => setNewName(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleCategoryUpdate()}>Save Changes</Button>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleDeleteCategory()}>Delete Category</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditCategory;