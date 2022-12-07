import {React, useState} from 'react';
import { Modal, Container, Button, Form} from "react-bootstrap";
import { deleteProductCategory } from '../api';

const DeleteCategory = ({token, productId, categoryId, name, getProductsHelper}) => {

    const [showModal, setShowModal] = useState(false);
    
    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleDeleteCategory(){
        const productCategoryToDelete = {
            productId: productId,
            categoryId: categoryId
        }
        await deleteProductCategory(token, productCategoryToDelete);
        getProductsHelper();
        handleClose();
    }



    return (
        <Container>
            <p>{name}</p>
            <Button style={{ fontSize: '10px' }} className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3 sm" onClick={() => handleShow()}>edit</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>Delete Category</Modal.Title>
                <Modal.Body>
                    <p>{name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleDeleteCategory()}>Delete Category</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}


export default DeleteCategory;