import { React, useState, useEffect} from 'react';
import { getProductById } from '../api';
import { Modal, Container, Button, Image} from "react-bootstrap";


const OrderDetails = ({orderDetailsProp}) => {

    const [orderDetails, setOrderDetails] = useState(orderDetailsProp);
    const [productToDisplay, setProductToDisplay] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {productId, quantity, price} = orderDetails[0];
    const {name} = productToDisplay;
    const total = price * quantity + '.00';

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function getProductHelper(){
        const result = await getProductById(productId);
        if(result){
            setProductToDisplay(result);
            setProductImages(result.productImages);
        }
    }


    useEffect(() => {
        getProductHelper();
    }, []);

    return (
        <Container>
            <Button style={{fontSize: '10px'}}className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Details</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title className='text-center mt-4'>Order Details</Modal.Title>
                <Modal.Body className='d-flex flex-column align-items-center'>
                    {
                        productImages.length ? productImages.map((image, idx) => {
                            const { imageURL} = image;
                            return (
                                <Image style={{width: '18rem', height: '18rem'}} key={idx} thumbnail='true' className="border border-dark border-2 shadow p-3 mb-5 bg-body rounded" src={imageURL.toString()}></Image>
                            )
                        }) : <></>
                    }
                    <p>Product Name: {name}</p>
                    <p>Price: ${price}</p>
                    <p>Quantity ordered: {quantity}</p>
                    <p>Total: ${total}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default OrderDetails;