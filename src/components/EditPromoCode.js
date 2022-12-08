import React, {useState} from "react";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { updatePromoCode, deletePromoCode } from "../api";

const EditPromoCode = ({token, getPromoCodesHelper, id, code, flatDiscount, percentDiscount }) => {

    const [newPercentDiscount, setNewPercentDiscount] = useState(0);
    const [newFlatDiscount, setNewFlatDiscount] = useState(0);
    const [newCode, setNewCode] = useState('');
    const [showModal, setShowModal] = useState(false);

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handlePromoCodeUpdate(){
        const updatedPromoCode = {
            id: id,
            code: newCode,
            flatDiscount: newFlatDiscount,
            percentDiscount: newPercentDiscount
        }
        await updatePromoCode(token, updatedPromoCode);
        getPromoCodesHelper();
        handleClose();
    }

    async function handleDeletePromoCode(){
        await deletePromoCode(token, id);
        getPromoCodesHelper();
        handleClose();
    }


    return (
        <Container>
            <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Edit</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Title>{code}</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder={code} onChange={(e) => setNewCode(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Flat Discount</Form.Label>
                            <Form.Control type="number" placeholder={flatDiscount} onChange={(e) => setNewFlatDiscount(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Percent Discount</Form.Label>
                            <Form.Control type="number" placeholder={percentDiscount} onChange={(e) => setNewPercentDiscount(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handlePromoCodeUpdate()}>Save Changes</Button>
                    <Button  className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleDeletePromoCode()}>Delete Promo Code</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditPromoCode;