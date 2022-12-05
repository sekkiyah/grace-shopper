import React, {useState} from "react";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { updateUser, deleteUser} from "../api";

const EditUser = ({token, users, userId, getUsersHelper}) => {
    const [currentUser] = users.filter((user) => user.id === userId);
    const {id, username, isAdmin, isBanned, passwordResetRequired} = currentUser;
    const [newIsAdmin, setNewIsAdmin] = useState(isAdmin);
    const [newIsBanned, setNewIsBanned] = useState(isBanned);
    const [newPasswordResetRequired, setNewPasswordResetRequired] = useState(passwordResetRequired);
    const [showModal, setShowModal] = useState(false);

    function handleShow(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    async function handleUserUpdate(){
        const updatedUser = {
            id: id,
            isAdmin: newIsAdmin,
            isBanned: newIsBanned,
            passwordResetRequired: newPasswordResetRequired
        }
        await updateUser(token, updatedUser);
        getUsersHelper();
        handleClose();
    }
    async function handleDeleteUser(){
        await deleteUser(token, id);
        getUsersHelper();
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
                            <Form.Label>{username}</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>isAdmin?</Form.Label>
                            <Form.Control type="checkbox" defaultChecked={newIsAdmin} onChange={(e) => setNewIsAdmin(e.target.checked)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>isBanned?</Form.Label>
                            <Form.Control type="checkbox" defaultChecked={newIsBanned} onChange={(e) => setNewIsBanned(e.target.checked)}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password Reset Required?</Form.Label>
                            <Form.Control type="checkbox" defaultChecked={newPasswordResetRequired} onChange={(e) => setNewPasswordResetRequired(e.target.checked)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleUserUpdate()}>Save Changes</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleDeleteUser()}>Delete User</Button>
                    <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditUser;