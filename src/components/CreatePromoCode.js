import {React, useState} from 'react';
import { Modal, Container, Button, Form} from "react-bootstrap";
import { createNewPromoCode } from '../api';

const CreatePromoCode = ({getPromoCodesHelper}) => {
    
    const [productId, setProductId] = useState(0);
    const [code, setCode] = useState('');
    const [flatDiscount, setFlatDiscount] = useState(0);
    const [percentDiscount, setPercentDiscount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    
    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleCreatePromoCode(){
        const newPromoCode = {
            productId: productId,
            code: code,
            flatDiscount: flatDiscount,
            percentDiscount: percentDiscount
        }
        await createNewPromoCode(newPromoCode);
        getPromoCodesHelper();
        handleClose();
    }



    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Create Promo Code</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>Create Promo Code</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Product Id</Form.Label>
                            <Form.Control type="number" placeholder='Enter Product Id' onChange={(e) => setProductId(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder='Enter Code' onChange={(e) => setCode(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Flat Discount</Form.Label>
                            <Form.Control type="number" placeholder='Enter Flat Discount' onChange={(e) => setFlatDiscount(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Percent Discount</Form.Label>
                            <Form.Control type="number" placeholder='Enter Percent Discount' onChange={(e) => setPercentDiscount(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleCreatePromoCode()}>Create Promo Code</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CreatePromoCode;