import React, { useState } from 'react';
import { registerUser } from '../api';
import { Container, Button, Form } from "react-bootstrap";

const Register = ({ setToken, navigate }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const verifyPassword = () => {
        if (password === confirmPassword) {
            handleSubmit();
        } else {
            alert('Passwords do not match, please try again.')
        }
    }

    const handleSubmit = async () => {
        const results = await registerUser(username, password);
        if (results) {
            setToken(results.token)
            window.localStorage.setItem('token', results.token)
            navigate('/')
        } else {
            alert("That username is taken!")
        }
    }

    return (
        <Container>
            <br></br>
            <h3>Register here to create an account!</h3>
            <br></br>
            <Form
                onSubmit={(event) => {
                    event.preventDefault();
                    verifyPassword();
                }}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email here..." value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username here..." value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password here..." value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password here..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="bg-danger bg-opacity-75 border border-dark text-dark fw-bold mb-3" type="submit">Register</Button>
            </Form>
        </Container>
    )
};

export default Register;