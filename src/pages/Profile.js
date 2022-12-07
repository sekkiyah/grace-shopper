import React, { useState } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import { updateUser } from "../api";

const Profile = ({ token, user }) => {

  const { id, email, username, firstName, lastName } = user;
  const [newEmail, setNewEmail] = useState(email);
  const [newUsername, setNewUsername] = useState(username);
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [showModal, setShowModal] = useState(false);

  function handleShow() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  async function handleUserUpdate() {
    const updatedUser = {
      id: id,
      email: newEmail,
      username: newUsername,
      firstName: newFirstName,
      lastName: newLastName
    }
    await updateUser(token, updatedUser);
    handleClose();
  }

  return (
    <Container>
      <br></br>
      <h3>Click the Edit button to make changes to your profile!</h3>
      <br></br>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder={email}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder={username} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder={firstName}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder={lastName}></Form.Control>
        </Form.Group>
      </Form>
      <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3 mt-3" onClick={() => handleShow()}>Edit</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Title>{name}</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Edit Profile</Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder={email} value={newEmail} onChange={(e) => setNewEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder={username} value={newUsername} onChange={(e) => setNewUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder={firstName} value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder={lastName} value={newLastName} onChange={(e) => setNewLastName(e.target.value)}></Form.Control>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleUserUpdate()}>Save Changes</Button>
          <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" onClick={() => handleClose()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Profile;