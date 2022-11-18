import React, { useState } from 'react';
// import { registerUser } from '../api'

const Register = ({ setToken, navigate }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!")
        }
        // const results = await registerUser(email, username, password);
        if (results.token) {
            setToken(results.token)
            window.localStorage.setItem('token', results.token)
            navigate('/')
        } else {
            alert("That username is taken!")
        }
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
        }}>
            <input
                type='text'
                placeholder='Enter email address'
                onSubmit={(event) => setEmail(event.target.value)} />
            <input
                type='text'
                placeholder='Enter username'
                onSubmit={(event) => setUsername(event.target.value)} />
            <input
                type='text'
                placeholder='Enter password'
                onSubmit={(event) => setPassword(event.target.value)} />
            <input
                type='text'
                placeholder='Confirm password'
                onSubmit={(event) => setConfirmPassword(event.target.value)} />
            <button type='submit'>Register</button>
        </form>
    )
};

export default Register;