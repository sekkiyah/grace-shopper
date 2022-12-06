import { React, useState, useEffect} from 'react';
import { createProductCategory, getAllCategories } from '../api';
import { Modal, Container, Button, Dropdown, DropdownButton} from "react-bootstrap";


const AddProductToCategory = ({token, productId, getProductsHelper}) => {
    
    const [categories, setCategories] = useState([]);
    const [targetCategory, setTargetCategory] = useState(0);
    const [showModal, setShowModal] = useState(false);

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
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

    async function handleCreateProductCategory(){
        const newProductCategory = {
            productId: productId,
            categoryId: targetCategory
        }
        await createProductCategory(token, newProductCategory);
        getProductsHelper();
        handleClose();
    }


    useEffect(() => {
        getCategoriesHelper();
    }, []);

    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Add Category</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>Add Category</Modal.Title>
                <Modal.Body className='d-flex flex-column'>
                    <Dropdown value={targetCategory} onSelect={handleSelectCategory} title={<span className='fs-5 text-light'>Categories</span>} className='fs-5 fw-bold' id='basic-nav-dropdown'>
                       
                        {
                           categories.length ? categories.map((category) => {
                            const {id, name } = category;
                            return (
                                <Dropdown.Item key={id} eventKey={id}>{name}</Dropdown.Item>
                            )
                           }) : <></>
                        }

                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleCreateProductCategory()}>Add Category</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )

}

export default AddProductToCategory;