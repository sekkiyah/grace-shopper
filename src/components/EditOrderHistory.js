import React, {useState} from "react";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { updateOrderHistory, deleteOrderHistoryByOrderId } from "../api";

const EditOrderHistory = ({token, status, id, getOrderHistoryHelper }) => {

    const [newStatus, setNewStatus] = useState('');
    const [showModal, setShowModal] = useState(false);

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleOrderHistoryUpdate(){
        const updatedOrderHistory = {
            id: id,
            status: newStatus
        }
        await updateOrderHistory(token, updatedOrderHistory);
        getOrderHistoryHelper();
        handleClose();
    }

    async function handleDeleteOrderHistory(){
        await deleteOrderHistoryByOrderId(token, id);
        getOrderHistoryHelper();
        handleClose();
    }


    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Edit</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>Order Status: {status}</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Update Status:</Form.Label>
                            <Form.Control type="text" placeholder={status} onChange={(e) => setNewStatus(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleOrderHistoryUpdate()}>Save Changes</Button>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleDeleteOrderHistory()}>Delete Order History</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditOrderHistory;