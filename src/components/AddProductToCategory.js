import { React, useState, useEffect} from 'react';
import { createProductCategory, getAllCategories } from '../api';
import { Modal, Container, Button, Dropdown, Form} from "react-bootstrap";


const AddProductToCategory = ({token, productId, getProductsHelper}) => {
    
    const [categories, setCategories] = useState([]);
    const [targetCategory, setTargetCategory] = useState({name: 'Select'});
    const [showModal, setShowModal] = useState(false);

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
        setTargetCategory({name: 'Select'})
    }

    async function getCategoriesHelper(){
        const result = await getAllCategories();
        if(result){
            setCategories(result);
        }
    }

    async function handleCreateProductCategory(){
        const newProductCategory = {
            productId: productId,
            categoryId: targetCategory.id
        }
        if(targetCategory.id){
            await createProductCategory(token, newProductCategory);
            getProductsHelper();
            handleClose();
        }
    }


    useEffect(() => {
        getCategoriesHelper();
    }, []);

    return (
        <Container>
            <Button style={{fontSize: '10px'}}className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Add Category</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>Add Category</Modal.Title>
                <Modal.Body className='d-flex flex-column'>
                    <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{targetCategory.name}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {
                           categories.length ? categories.map((category) => {
                            const {id, name } = category;
                            return (
                                <Dropdown.Item onClick={() => setTargetCategory(category)} key={id}>{name}</Dropdown.Item>
                            )
                           }) : <></>
                        }
                        </Dropdown.Menu>
                    </Dropdown>
                    </Form>
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