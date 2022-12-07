import React, { useState } from 'react';
import { Modal, Container, Button, Form } from 'react-bootstrap';
import { updateUser } from '../api';

const Profile = ({ token, user, getUser }) => {
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
      lastName: newLastName,
    };
    const result = await updateUser(token, updatedUser);
    if (result) {
      await getUser();
      handleClose();
    }
  }

  return (
    <Container className='text-center'>
      <h3 className='mt-3'>Profile</h3>
      <Form className='mt-3'>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control className='text-center' plaintext readOnly placeholder={email}></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control className='text-center' plaintext readOnly placeholder={username}></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control className='text-center' plaintext readOnly placeholder={firstName}></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control className='text-center' plaintext readOnly placeholder={lastName}></Form.Control>
        </Form.Group>
        <Button className='bg-danger bg-opacity-75 border border-dark text-dark fw-bold' onClick={() => handleShow()}>
          Edit
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ fontSize: '20px' }}>
          <Modal.Title className='w-100 text-center'>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-2'>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder={email} onChange={e => setNewEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder={username} onChange={e => setNewUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder={firstName} onChange={e => setNewFirstName(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder={lastName} onChange={e => setNewLastName(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='p-1'>
          <Button
            className='bg-danger bg-opacity-75 border border-dark text-dark fw-bold'
            onClick={() => handleUserUpdate()}>
            Save Changes
          </Button>
          <Button
            className='bg-secondary bg-opacity-75 border border-dark text-dark fw-bold'
            onClick={() => handleClose()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
